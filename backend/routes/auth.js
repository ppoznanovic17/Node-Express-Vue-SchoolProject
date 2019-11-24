const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');


let pictureDefault = 'https://www.washingtonpost.com/resizer/nQ3BFKr5OHw9nI61uVsjz7hXk58=/1440x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/3TOQIFMDDU5ADCCIZM42RXGZMY.jpg';

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    //password
    database: 'skriptdomaci1'
});

const route = express.Router();

const sema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(15).required(),
    password: Joi.string().trim().max(10).required(),
    picture: Joi.string().allow('').optional()
});

route.use(express.json());

route.post('/reg', (req, res) => {

    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        if(req.body.picture == null || req.body.picture==""){

        }else{
            pictureDefault= req.body.picture;
        }

        let query = "insert into user (username, password, picture) values (?, ?, ?)";
        let formated = mysql.format(query, [req.body.username, req.body.password, pictureDefault]);

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from user where id=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }

});

route.get('/reg', (req, res) => {
    // Saljemo upit bazi
    pool.query('select * from user', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);  // Greska servera
        else
            res.send(rows);
    });
});

module.exports = route;
