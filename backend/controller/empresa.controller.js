const { config } = require("dotenv");
const mysql = require("mysql2/promise");
const EmpresaModel = require("../model/Empresa");
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


class EmpresaController {
    async registroEmpresa(req, res) {
        const { nomeEmpresa, emailEmpresa, senhaEmpresa, descEmpresa, CNPJEmpresa, razaoSocialEmpresa, areaAtuacaoEmpresa, numeroFuncionariosEmpresa, ramoEmpresa } = req.body;
        // Verificar se todos os campos foram fornecidos
        if (!nomeEmpresa || !emailEmpresa || !senhaEmpresa || !descEmpresa || !CNPJEmpresa || !razaoSocialEmpresa || !areaAtuacaoEmpresa || !numeroFuncionariosEmpresa || !ramoEmpresa) {
            return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
        }

        try {
            // Criar uma nova instância de Empresa com os dados fornecidos
            const novaEmpresa = new EmpresaModel(nomeEmpresa, emailEmpresa, senhaEmpresa, descEmpresa, CNPJEmpresa, razaoSocialEmpresa, areaAtuacaoEmpresa, numeroFuncionariosEmpresa, ramoEmpresa);

            // Inserir a empresa no banco de dados
            await clientDB.query("INSERT INTO empresa SET ?", novaEmpresa);

            res.status(201).json({ msg: "Empresa registrada com sucesso!" });
        } catch (error) {
            console.error("Erro ao registrar empresa:", error);
            res.status(500).json({ msg: "Erro interno do servidor ao registrar empresa." });
        }
    }
}




module.exports = EmpresaController;