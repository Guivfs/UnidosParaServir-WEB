const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const VagaModel = require("../model/Vaga");

config();

const clientDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

class VagaController {
  async obterVagasEmpresa(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const idEmpresaLogado = decodedToken.id;

      const [rows] = await clientDB.query(
        "SELECT * FROM vaga WHERE idEmpresa = ?",
        [idEmpresaLogado]
      );

      if (rows.length < 1) {
        return res
          .status(404)
          .json({ msg: "Não foi possível encontrar vagas disponíveis" });
      }

      res.json(rows);
    } catch (error) {
      console.error("Erro ao obter vagas da empresa:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao obter vagas da empresa." });
    }
  }

  async obterVagaPorId(req, res) {
    const { id } = req.params;

    try {
      const [rows] = await clientDB.query("SELECT * FROM vaga WHERE idVaga = ?", [id]);
      if (rows.length < 1) {
        return res.status(404).json({ msg: "Vaga não encontrada." });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Erro ao obter vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao obter vaga." });
    }
  }

  async obterVagas(req, res) {
    try {
      const [rows] = await clientDB.query("SELECT * FROM vaga");
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
    const { tituloVaga, descVaga, fotoVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento } = req.body;
    if (!tituloVaga || !descVaga || !fotoVaga || !idEmpresa || !statusVaga || !dataCriacao || !valorPagamento) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    try {
      const novaVaga = new VagaModel(tituloVaga, descVaga, fotoVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento);
      await clientDB.query("INSERT INTO vaga SET ?", novaVaga);
      res.status(201).json({ msg: "Vaga criada com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao criar vaga." });
    }
  }

  async atualizarVaga(req, res) {
    const { id } = req.params;
    const { tituloVaga, descVaga, fotoVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento, idUsuario } = req.body;

    if (!tituloVaga || !descVaga || !fotoVaga || !idEmpresa || !statusVaga || !dataCriacao || !valorPagamento) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    try {
      const [result] = await clientDB.query(
        "UPDATE vaga SET tituloVaga = ?, descVaga = ?, fotoVaga = ?, idEmpresa = ?, statusVaga = ?, dataCriacao = ?, valorPagamento = ?, idUsuario = ? WHERE idVaga = ?",
        [tituloVaga, descVaga, fotoVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento, idUsuario, id]
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
      const [result] = await clientDB.query("DELETE FROM vaga WHERE idVaga = ?", [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Vaga não encontrada." });
      }
      res.status(200).json({ msg: "Vaga deletada com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao deletar vaga." });
    }
  }

  async preencherVaga(req, res) {
    const { id } = req.params; // ID da vaga

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const idUsuarioLogado = decodedToken.id;

      // Atualiza a vaga para associar o usuário e mudar o status para "preenchida"
      const [result] = await clientDB.query(
        "UPDATE vaga SET idUsuario = ?, statusVaga = 'preenchida' WHERE idVaga = ? AND statusVaga = 'aberta'",
        [idUsuarioLogado, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Vaga não encontrada ou já preenchida." });
      }

      res.status(200).json({ msg: "Vaga preenchida com sucesso!" });
    } catch (error) {
      console.error("Erro ao preencher vaga:", error);
      res.status(500).json({ msg: "Erro interno do servidor ao preencher vaga." });
    }
  }

}

module.exports = VagaController;
