const VagaController = require('../controller/vaga.controller');
const express = require('express');

const vagaRoutes = express.Router();

const vagaController = new VagaController();

vagaRoutes.get('/vagas',vagaController.obterVagas);
vagaRoutes.post('/registro-vagas', vagaController.criarVaga);

module.exports = vagaRoutes;