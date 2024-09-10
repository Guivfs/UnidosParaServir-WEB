const express = require('express');
const VagaController = require('../controller/vaga.controller');

const router = express.Router();
const vagaController = new VagaController();

router.get('/vagas/buscar', vagaController.obterVagas);
router.get('/vagas/buscar/:id', vagaController.obterVagaPorId);
router.get('/vagas/buscar-vagas-empresa', vagaController.obterVagasEmpresa);
router.post('/vagas/registrar', vagaController.criarVaga);
router.put('/vagas/atualizar/:id', vagaController.atualizarVaga);
router.delete('/vagas/apagar/:id', vagaController.deletarVaga);
router.put('/vagas/preencher/:id', vagaController.preencherVaga);

module.exports = router;
