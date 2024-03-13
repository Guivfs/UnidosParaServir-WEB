require ('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2');
//importação do swagger

const app = express()

app.get('/', (req,res)=>{
    res.status(200).json({msg:'Bem vindo a nossa API!'})
})

app.listen(8080)