const express = require('express');
const app = express();
const path = require('path');

const mysql = require('mysql');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public'))); //静的ファイル

//connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "Cooking-Search"

})

app.get('/test', (req, res) => {
    res.send('テスト');
    pool.getConnection((err, connection) => {
        if(err) throw err;

        console.log('MYSQLと接続中。。。')

        //データ取得
        connection.query("SELECT * FROM user", (err, users) => {
            connection.release();

            console.log(users)
        })

    })
});

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中。')
});