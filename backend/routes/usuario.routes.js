const UserController = require("../controller/user.controller")

const express = require ("express");
const usuarioRoutes = express.Router();

const userController = new UserController()

usuarioRoutes.post("/registro-usuario", userController.registroUsuario);

module.exports = usuarioRoutes;