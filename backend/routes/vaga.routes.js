const express = require('express');
const VagaController = require('../controller/vaga.controller');

const router = express.Router();
const vagaController = new VagaController();

router.get('/vagas/buscar', (req, res) => vagaController.obterVagas(req, res));
router.get('/vagas/buscar/:id', (req, res) => vagaController.obterVagaPorId(req, res));
router.get('/vagas/buscar-vagas-empresa', (req, res) => vagaController.obterVagasEmpresa(req, res));
router.post('/vagas/registrar', (req, res) => vagaController.criarVaga(req, res));
router.put('/vagas/atualizar/:id', (req, res) => vagaController.atualizarVaga(req, res));
router.delete('/vagas/apagar/:id', (req, res) => vagaController.deletarVaga(req, res));

module.exports = router;
