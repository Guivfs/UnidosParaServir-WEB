const EmpresaController = require('../controller/empresa.controller');

const express = require("express");
const empresaRoutes = express.Router();

const empresaController = new EmpresaController();

empresaRoutes.post("/registro-empresa", empresaController.registroEmpresa);
empresaRoutes.get("/buscar-empresa/:idEmpresa", empresaController.getOneEmpresa);

module.exports = empresaRoutes