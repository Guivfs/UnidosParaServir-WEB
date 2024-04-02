const UserController = require("../controller/user.controller.js");

const express = require("express");
const loginRoutes = express.Router();

const userController = new UserController();

loginRoutes.post("/registro", userController.registroUsuario);
loginRoutes.post("/login", userController.loginUsuario);

module.exports = loginRoutes;
