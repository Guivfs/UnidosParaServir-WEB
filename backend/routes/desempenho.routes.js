const express = require('express');
const DesempenhoController = require('../controller/desempenho.controller');

const router = express.Router();
const desempenhoController = new DesempenhoController();

// Rotas para candidaturas
router.get('/candidaturas/obter', desempenhoController.obterCandidaturasPorUsuario); 
router.post('/candidaturas/criar', desempenhoController.criarCandidatura); 
router.put('/candidaturas/atualizar/:idCandidatura', desempenhoController.atualizarCandidatura); 
router.get('/candidaturas/verificar-candidatura/:idVaga/:idUsuario', desempenhoController.verificarCandidatura.bind(desempenhoController));


// Rotas para visitas
router.get('/visitas/obter', desempenhoController.obterVisitasPorUsuario); 
router.post('/visitas/criar', desempenhoController.criarVisita); 
router.put('/visitas/atualizar/:idVisita', desempenhoController.atualizarVisita); 

module.exports = router;
