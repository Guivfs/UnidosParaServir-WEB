// controller/VagaController.js
const mysql = require("mysql2/promise");
const VagaModel = require("../model/Vaga");

const clientDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

class VagaController {
  async obterVagas(req, res) {
    try {
      const [rows] = await clientDB.query("SELECT * FROM vaga_empresa");
      if (rows.length < 1) {
        return res
          .status(404)
          .json({ msg: "Não foi possivel encontrar vagas disponiveis" });
      }
      res.json(rows);
    } catch (error) {
      console.error("Erro ao obter vagas:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao obter vagas." });
    }
  }

  async criarVaga(req, res) {
    const { tituloVaga, descVaga, fotoVaga } = req.body;
    if (!tituloVaga || !descVaga || !fotoVaga) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    try {
      const novaVaga = new VagaModel(tituloVaga, descVaga, fotoVaga);
      await clientDB.query("INSERT INTO vaga_empresa SET ?", novaVaga);
      res.status(201).json({ msg: "Vaga criada com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao criar vaga." });
    }
  }
}

module.exports = VagaController;
