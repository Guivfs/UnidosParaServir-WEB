const LoginController = require("../controller/login.controller.js");

const express = require("express");
const loginRoutes = express.Router();

const loginController = new LoginController();

loginRoutes.post("/login", loginController.login);

module.exports = loginRoutes;
