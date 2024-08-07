const mysql = require('mysql2');
const { User } = require('../models/user'); //User - Models

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xnkdr@2426",
    database: "cookingSearchDB"
});

module.exports.renderHomepage = async (req, res) => {
    const user = req.session.user[0];
    const sql = `SELECT * FROM users WHERE id='${user.id}'`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('home', {loggedinUser: result[0]});
    });
};

module.exports.updateFridgeItems = async (req, res) => {
    const items = JSON.stringify(req.body.fridgeItem);
    const loggedinUser = req.session.user;
    const find_sql = `SELECT * FROM users WHERE id='${loggedinUser[0].id}'`;

    conn.query(find_sql, (err, result) => {
        if (err) throw err;
        const update_sql = `UPDATE users SET userItems='${items}' WHERE id='${result[0].id}'`;
        conn.query(update_sql, (err, result) => {
            if (err) throw err;
            res.redirect('/homepage/:id');
        });
    });
};

module.exports.renderEditForm = async (req, res) => {
    const sql = `SELECT * FROM users WHERE id='${req.params.id}'`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('edit', {loggedinUser: result[0]});
    });
};