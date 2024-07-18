const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const clientDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

class LoginController {
  async login(req, res) {
    const { email, senha } = req.body;

    console.log(email, senha);

    if (!email || !senha) {
      return res.status(422).json({ msg: "E-mail e senha são obrigatórios" });
    }

    try {
      var role = "guest";
      let id;
      let hashedPassword;

      // Tente encontrar o usuário na tabela de usuário
      let [rows] = await clientDB.query(
        "SELECT * FROM usuario WHERE emailUsuario = ?",
        [email]
      );

      //Caso encontre na tabela de usuário
      if(rows.length > 0){
        role = "user"  
        id = rows[0].idUsuario;
        hashedPassword = rows[0].senhaUsuario;
      } //Procure na tabela empresa
      else {
        [rows] = await clientDB.query(
          "SELECT * FROM empresa WHERE emailEmpresa = ?",
          [email]
        );
        //Caso encontre na tabela de empresa...
        if (rows.length > 0) {
          role = "company";
          id = rows[0].idEmpresa;
          hashedPassword = rows[0].senhaEmpresa;
        }
        else{
          return res.status(422).json({ msg: "E-mail incorreto!" });
        }
      }
      // Verificação de senha
      const isPasswordValid = await bcrypt.compare(senha, hashedPassword);

      if (!isPasswordValid) {
        return res.status(422).json({ msg: "Senha incorreta!" });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign({ id }, secret);
      res.status(200).json({ msg: "Login bem sucedido!", token, id, role });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: "Erro interno no servidor ao realizar login!" });
    }
  }
}

module.exports = LoginController;
