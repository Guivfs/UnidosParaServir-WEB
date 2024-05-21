const UserController = require("../controller/user.controller.js");

const express = require("express");
const loginRoutes = express.Router();

const userController = new UserController();

loginRoutes.post("/registro-usuario", userController.registroUsuario);
loginRoutes.post("/login-usuario", userController.loginUsuario);

module.exports = loginRoutes;
