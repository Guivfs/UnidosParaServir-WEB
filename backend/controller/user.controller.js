const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const UserModel = require("../model/User");
const { checkarToken } = require("../middleware/authMiddleware.ts");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

config();

const clientDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

class UserController {
  async registroUsuario(req, res) {
    const {nomeUsuario, userUsuario, senhaUsuario, cepUsuario, emailUsuario} = req.body;
    
    if (!nomeUsuario) {
      res.status(422).json({ msg: "O nome é obrigatório" });
    }
    if (!userUsuario) {
      res.status(422).json({ msg: "O username é obrigatório" });
    }
    if (!emailUsuario) {
      res.status(422).json({ msg: "O e-mail é obrigatório" });
    }
    if (!senhaUsuario) {
      res.status(422).json({ msg: "A senha é obrigatória" });
    }
    if (!cepUsuario) {
      res.status(422).json({ msg: "O cep é obrigatório" });
    }

    //checkar se o usuario existe
    const [rows] = await clientDB.query(
      "SELECT * FROM usuario WHERE emailUsuario = ?",
      [emailUsuario]
    );
    if (rows.length > 0) {
      return res
        .status(422)
        .json({ msg: "E-mail em uso! Por favor, utilize outro e-mail!" });
    }
    
    try {
      //create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(senhaUsuario, salt);

      //create user
      const novoUsuario = new UserModel(nomeUsuario, userUsuario, passwordHash, cepUsuario, emailUsuario);

      await clientDB.query("INSERT INTO usuario SET ?", novoUsuario);
      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor ao criar usuário" });
      console.log(error)
    }
}


  async loginUsuario(req, res) {
    const { emailUsuario, senhaUsuario } = req.body;

    if (!emailUsuario || !senhaUsuario) {
      return res.status(422).json({ msg: "E-mail e senha são obrigatórios" });
    }

    try {
      const [rows] = await clientDB.query(
        "SELECT * FROM usuario WHERE emailUsuario = ?",
        [emailUsuario]
      );
      if (rows.length === 0) {
        return res.status(422).json({ msg: "E-mail incorreto!" });
      }
      const user = rows[0];

      const senhaCorreta = await bcrypt.compare(
        senhaUsuario,
        user.senhaUsuario
      );
      if (!senhaCorreta) {
        return res.status(401).json({ msg: "Senha incorreta!" });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign({ id: user.idUsuario }, secret);
      
      res.status(200).json({ msg: "Login bem sucedido!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro interno no servidor ao realizar login!" });
    }

  }
}

module.exports = UserController;
