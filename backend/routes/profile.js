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

const sema = Joi.object().keys({
    header: Joi.string().trim().min(4).max(15).required(),
    content: Joi.string().trim().max(255).required(),
    date: Joi.string(),
    userid: Joi.string()
});

const sema2 = Joi.object().keys({
    username: Joi.string().trim().min(4).max(15).required(),
    password: Joi.string().trim().max(10).required(),
    picture: Joi.string()
});



route.use(express.json());

route.get('/:id', (req, res) => {
    let query = 'select * from post where userid=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
});

route.post('/', (req, res) => {

    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        let today = new Date().toISOString().slice(0, 10)

        let query = "insert into post (header, content, date, userid ) values (?, ?, ?, ?)";
        let formated = mysql.format(query, [req.body.header, req.body.content, today, 1]);

        // Izvrsimo query
        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from post where id=?';
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

route.put('/post/:id', (req, res) => {
    let { error } = Joi.validate(req.body, sema);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update post set header=?,content=? where id=?";
        let formated = mysql.format(query, [req.body.header, req.body.content, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from post where id=?';
                formated = mysql.format(query, [req.params.id]);

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

route.delete('/:id', (req, res) => {
    let query = 'select * from post where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from post where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(poruka);
            });
        }
    });
});

route.put('/user/:id', (req, res) => {
    let { error } = Joi.validate(req.body, sema2);

    if (error)
        res.status(400).send(error.details[0].message);
    else {
        let query = "update user set username=?,password=?, picture=? where id=?";
        let formated = mysql.format(query, [req.body.username, req.body.password,req.body.picture, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from post where id=?';
                formated = mysql.format(query, [req.params.id]);

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

route.delete('/user/:id', (req, res) => {
    let query = 'select * from user where id=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let poruka = rows[0];

            let query = 'delete from user where id=?';
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(poruka);
            });
        }
    });
});


module.exports = route;
