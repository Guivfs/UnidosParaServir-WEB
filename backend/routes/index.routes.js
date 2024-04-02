const express = require ('express');
const loginRoutes = require('./login.routes');

const mainRoutes = express.Router();

const allRoutes = [mainRoutes, loginRoutes]

module.exports = allRoutes;