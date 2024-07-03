const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const EmpresaModel = require("../model/Empresa");
const bcrypt = require("bcryptjs");

config();

const clientDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

class EmpresaController {
  async getOneEmpresa(req, res) {
    const { idEmpresa } = req.params;
  
    if (!idEmpresa) {
      return res.status(422).json({ msg: "ID da empresa é obrigatório!" });
    }
  
    try {
      const [rows] = await clientDB.query(
        "SELECT * FROM empresa WHERE idEmpresa = ?",
        [idEmpresa]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ msg: "Empresa não encontrada!" });
      }
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Erro ao buscar empresa:", error);
      res
        .status(500)
        .json({ msg: "Erro interno do servidor ao buscar empresa." });
    }
  }
  async registroEmpresa(req, res) {
    const {
      nomeEmpresa,
      emailEmpresa,
      senhaEmpresa,
      descEmpresa,
      CNPJEmpresa,
      razaoSocialEmpresa,
      areaAtuacaoEmpresa,
      numeroFuncionariosEmpresa,
      ramoEmpresa,
    } = req.body;
    // Verificar se todos os campos foram fornecidos
    if (
      !nomeEmpresa ||
      !emailEmpresa ||
      !senhaEmpresa ||
      !descEmpresa ||
      !CNPJEmpresa ||
      !razaoSocialEmpresa ||
      !areaAtuacaoEmpresa ||
      !numeroFuncionariosEmpresa ||
      !ramoEmpresa
    ) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    //checkar se o usuario existe
    const [rows] = await clientDB.query(
      "SELECT * FROM empresa WHERE emailEmpresa = ?",
      [emailEmpresa]
    );
    if (rows.length > 0) {
      return res
        .status(422)
        .json({ msg: "E-mail em uso! Por favor, utilize outro e-mail!" });
    }

    try {
      //create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(senhaEmpresa, salt);
      // create empresa
      const novaEmpresa = new EmpresaModel(
        nomeEmpresa,
        emailEmpresa,
        passwordHash,
        descEmpresa,
        CNPJEmpresa,
        razaoSocialEmpresa,
        areaAtuacaoEmpresa,
        numeroFuncionariosEmpresa,
        ramoEmpresa
      );
      // Inserir a empresa no banco de dados
      await clientDB.query("INSERT INTO empresa SET ?", novaEmpresa);
      res.status(201).json({ msg: "Empresa registrada com sucesso!" });

    } catch (error) {
      console.error("Erro ao registrar empresa:", error);
      res
        .status(500)
        .json({ msg: "Erro interno do servidor ao registrar empresa." });
    }
  }

  // Atualizar Empresa (id)
  async atualizarEmpresa(req, res) {
    const { idEmpresa } = req.params;
    const {
      nomeEmpresa,
      emailEmpresa,
      senhaEmpresa,
      descEmpresa,
      CNPJEmpresa,
      razaoSocialEmpresa,
      areaAtuacaoEmpresa,
      numeroFuncionariosEmpresa,
      ramoEmpresa,
    } = req.body;

    console.log("Dados recebidos", nomeEmpresa,
      emailEmpresa,
      senhaEmpresa,
      descEmpresa,
      CNPJEmpresa,
      razaoSocialEmpresa,
      areaAtuacaoEmpresa,
      numeroFuncionariosEmpresa,
      ramoEmpresa,)
    if (!nomeEmpresa && !emailEmpresa && !senhaEmpresa && !descEmpresa && !CNPJEmpresa && !razaoSocialEmpresa && !areaAtuacaoEmpresa && !numeroFuncionariosEmpresa && !ramoEmpresa) {
      return res.status(422).json({ msg: "Nenhum dado para atualizar" });
    }

    let updateFields = {};
    if (nomeEmpresa) updateFields.nomeEmpresa = nomeEmpresa;
    if (emailEmpresa) updateFields.emailEmpresa = emailEmpresa;
    if (descEmpresa) updateFields.descEmpresa = descEmpresa;
    if (CNPJEmpresa) updateFields.CNPJEmpresa = CNPJEmpresa;
    if (razaoSocialEmpresa) updateFields.razaoSocialEmpresa = razaoSocialEmpresa;
    if (areaAtuacaoEmpresa) updateFields.areaAtuacaoEmpresa = areaAtuacaoEmpresa;
    if (numeroFuncionariosEmpresa) updateFields.numeroFuncionariosEmpresa = numeroFuncionariosEmpresa;
    if (ramoEmpresa) updateFields.ramoEmpresa = ramoEmpresa;

    if (senhaEmpresa) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(senhaEmpresa, salt);
      updateFields.senhaEmpresa = passwordHash;
    }

    try {
      await clientDB.query("UPDATE empresa SET ? WHERE idEmpresa = ?", [updateFields, idEmpresa]);
      res.status(200).json({ msg: "Empresa atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor ao atualizar empresa" });
      console.log(error);
    }
  }

  // Deletar Empresa (id)
  async deletarEmpresa(req, res) {
    const { idEmpresa } = req.params;
    try {
      await clientDB.query("DELETE FROM empresa WHERE idEmpresa = ?", [idEmpresa]);
      res.status(200).json({ msg: "Empresa deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor ao deletar empresa" });
      console.log(error);
    }
  }
}

module.exports = EmpresaController;
