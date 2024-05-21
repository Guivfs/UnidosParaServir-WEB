const express = require ('express');
const loginRoutes = require('./login.routes');
const empresaRoutes = require('./empresa.routes')

const mainRoutes = express.Router();

const allRoutes = [mainRoutes, loginRoutes, empresaRoutes]

module.exports = allRoutes;