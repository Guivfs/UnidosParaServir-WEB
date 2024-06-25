const UserController = require("../controller/user.controller")

const express = require ("express");
const usuarioRoutes = express.Router();

const userController = new UserController()

usuarioRoutes.get("/buscar-usuario/:id", userController.getOneUser);
usuarioRoutes.post("/registro-usuario", userController.registroUsuario);
usuarioRoutes.put("/atualizar-usuario/:id",userController.atualizarUsuario);
usuarioRoutes.delete("/apagar-usuario/:id",userController.deletarUsuario)

module.exports = usuarioRoutes;