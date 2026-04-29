const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const modelUsuarios = require('../models/usuarios.model');

module.exports.getAllUsers = async(req, res) => {
    let correo = "";
    let contrasena = "";

    let usuarios = modelUsuarios.ObtenerUsuarios(correo, contrasena);

    let activeUsers = usuarios.filter(user => user.active);

    /*res.setHeader("Content-Type", "application/json");
    res.status(200)
        .json({ status: "success",
                message:"Get all users",
                data: activeUsers
            });
    res.end();*/
    
    res.render("./usuarios/obtener_usuarios",{
        title: "Obtener Usuarios",
        usuarios: activeUsers
    });
}