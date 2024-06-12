const express = require ('express');
const loginRoutes = require('./login.routes');
const empresaRoutes = require('./empresa.routes');
const vagaRoutes = require('./vaga.routes');
const usuarioRoutes = require('./usuario.routes');

const mainRoutes = express.Router();

const allRoutes = [mainRoutes, loginRoutes, empresaRoutes,vagaRoutes,usuarioRoutes]

module.exports = allRoutes;