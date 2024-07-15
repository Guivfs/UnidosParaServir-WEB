const express = require('express');
const VagaController = require('../controller/vaga.controller');

const router = express.Router();
const vagaController = new VagaController();

router.get('/vagas', (req, res) => vagaController.obterVagas(req, res));
router.post('/vagas', (req, res) => vagaController.criarVaga(req, res));
router.put('/vagas/:id', (req, res) => vagaController.atualizarVaga(req, res));
router.delete('/vagas/:id', (req, res) => vagaController.deletarVaga(req, res));

module.exports = router;
