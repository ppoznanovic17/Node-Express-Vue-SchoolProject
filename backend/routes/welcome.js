const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    //password
    database: 'skriptdomaci1'
});

const route = express.Router();

route.get('/posts', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from post', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    });
});

route.get('/users', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from user', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    });
});

module.exports = route;
