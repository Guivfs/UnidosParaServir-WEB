const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const UserModel = require("../model/User");
const bcrypt = require("bcryptjs");

//Checkar se tem login para poder acessar a rota
// const { checkarToken } = require("../middleware/authMiddleware.ts");

config();

const clientDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

class UserController {

  //Post(new user)
  async registroUsuario(req, res) {
    const { nomeUsuario, userUsuario, senhaUsuario, cepUsuario, emailUsuario } =
      req.body;
    console.log(nomeUsuario);

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
      const novoUsuario = new UserModel(
        nomeUsuario,
        userUsuario,
        passwordHash,
        cepUsuario,
        emailUsuario
      );
      //Inserir a empresa no banco de dados
      await clientDB.query("INSERT INTO usuario SET ?", novoUsuario);
      res.status(201).json({ msg: "Usuário criado com sucesso!" });
      
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor ao criar usuário" });
      console.log(error);
    }
  }


  //Get (id)
  async getOneUser(req, res) {
    const userId = req.params.id;
    console.log(userId)

    try {
      const [rows] = await clientDB.query("SELECT * FROM usuario WHERE idUsuario = ?", [userId]);
      console.log([rows])
      if (rows.length === 0) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      const user = rows[0];
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar usuário" });
      console.error(error);
    }
  }
}

module.exports = UserController;
