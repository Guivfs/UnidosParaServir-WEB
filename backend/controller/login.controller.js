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
      let isUser = true;
      let id;
      let hashedPassword;

      // Tente encontrar o usuário na tabela de usuário
      let [rows] = await clientDB.query(
        "SELECT * FROM usuario WHERE emailUsuario = ?",
        [email]
      );

      // Se não encontrar, tente encontrar na tabela de empresa
      if (rows.length === 0) {
        [rows] = await clientDB.query(
          "SELECT * FROM empresa WHERE emailEmpresa = ?",
          [email]
        );
        isUser = false;
        if (rows.length === 0) {
          return res.status(422).json({ msg: "E-mail incorreto!" });
        }
      }

      if (isUser) {
        id = rows[0].idUsuario;
        hashedPassword = rows[0].senhaUsuario;
      } else {
        id = rows[0].idEmpresa;
        hashedPassword = rows[0].senhaEmpresa;
      }

      // Verificação de senha
      const isPasswordValid = await bcrypt.compare(senha, hashedPassword);

      if (!isPasswordValid) {
        return res.status(422).json({ msg: "Senha incorreta!" });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign({ id }, secret, { expiresIn: "1h" });
      res.status(200).json({ msg: "Login bem sucedido!", token });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: "Erro interno no servidor ao realizar login!" });
    }
  }
}

module.exports = LoginController;
