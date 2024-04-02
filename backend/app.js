const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swagger.json');
const jwt = require('jsonwebtoken');
const allRoutes = require('./routes/index.routes.js');
const mysql = require('mysql2');
const { config } = require('dotenv');

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(allRoutes);

const clientDB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

// Teste e conexão com o banco de dados.
clientDB.connect((erro) => {
    if (erro) {
        console.error("Erro ao tentar estabelecer conexão: " + erro.stack);
        return;
    }
    console.log("Conectado ao banco: " + process.env.DATABASE);
});

// Descomente para usar a forma padrão 
 app.use("/", (req, res) => {
    return res.status(200).json({ msg: "Bem-vindo à rota padrão!" })});

// Descomente para incluir a rota Swagger
// app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(allRoutes);

app.listen(8080, () => console.log("Servidor está rodando na porta: 8080 -> http://localhost:8080/"));

module.exports = clientDB;
