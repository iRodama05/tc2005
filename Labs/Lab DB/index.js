const express = require('express');
const path = require('path');
const app = express();

// Eliminada la línea: const pool = require("../util/database"); para evitar el conflicto

require("dotenv").config();
const { Pool } = require("pg");

// Se mantiene la configuración directa del Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5,
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
    res.status(200).json({message: "OK"});
});

app.get("/test_db", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM games limit 20");
        res.status(200).json(rows);
    } catch(e) {
        console.log(e);
        res.status(500).json({ msg: "Error al consultar la base de datos" });
    }
});

app.get("/buscar-inseguro", async (req, res) => {
    const titulo = req.query.titulo;
    const sql = `SELECT * FROM games WHERE title ILIKE '%${titulo}%'`;
    const { rows } = await pool.query(sql);
    res.status(200).json(rows);
});

// Corregido: se agregó '/' antes de 'buscar'
app.get("/buscar", async (req, res) => {
    const titulo = req.query.titulo;
    const sql = `SELECT * FROM games WHERE title ILIKE $1`;
    const { rows } = await pool.query(sql, [`%${titulo}%`]);
    res.status(200).json(rows);
});

exports.count = async () => {
    const { rows } = await pool.query("SELECT COUNT(*)::int AS total FROM games");
    return rows[0].total;
}

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});