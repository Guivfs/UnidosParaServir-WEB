const EmpresaController = require('../controller/empresa.controller');

const express = require("express");
const empresaRoutes = express.Router();

const empresaController = new EmpresaController();

empresaRoutes.get("/buscar-empresa/:idEmpresa", empresaController.getOneEmpresa);
empresaRoutes.post("/registro-empresa", empresaController.registroEmpresa);
empresaRoutes.put("/atualizar-empresa/:idEmpresa", empresaController.atualizarEmpresa);
empresaRoutes.delete("/apagar-empresa/:idEmpresa", empresaController.deletarEmpresa);

module.exports = empresaRoutes