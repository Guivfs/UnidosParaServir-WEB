const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const VagaModel = require("../model/Vaga");

config();

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
          .json({ msg: "Não foi possível encontrar vagas disponíveis" });
      }
      res.json(rows);
    } catch (error) {
      console.error("Erro ao obter vagas:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao obter vagas." });
    }
  }

  async criarVaga(req, res) {
    const { tituloVaga, descVaga, fotoVaga, empresa_id } = req.body;
    if (!tituloVaga || !descVaga || !fotoVaga || !empresa_id) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    try {
      const novaVaga = new VagaModel(tituloVaga, descVaga, fotoVaga, empresa_id);
      await clientDB.query("INSERT INTO vaga_empresa SET ?", novaVaga);
      res.status(201).json({ msg: "Vaga criada com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao criar vaga." });
    }
  }

  async atualizarVaga(req, res) {
    const { id } = req.params;
    const { tituloVaga, descVaga, fotoVaga, empresa_id } = req.body;
    if (!tituloVaga || !descVaga || !fotoVaga || !empresa_id) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    try {
      const [result] = await clientDB.query(
        "UPDATE vaga_empresa SET tituloVaga = ?, descVaga = ?, fotoVaga = ?, empresa_id = ? WHERE id = ?",
        [tituloVaga, descVaga, fotoVaga, empresa_id, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Vaga não encontrada." });
      }
      res.status(200).json({ msg: "Vaga atualizada com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao atualizar vaga." });
    }
  }

  async deletarVaga(req, res) {
    const { id } = req.params;

    try {
      const [result] = await clientDB.query("DELETE FROM vaga_empresa WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Vaga não encontrada." });
      }
      res.status(200).json({ msg: "Vaga deletada com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao deletar vaga." });
    }
  }
}

module.exports = VagaController;
