const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xnkdr@2426",
    database: "cookingSearchDB"
});

module.exports.renderRegisterForm = (req, res) => {
    res.render('register');
};

module.exports.createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const defaultItems = '["ご飯", "納豆", "味噌汁", "きゅうり"]';
        const saltRound = 10;
        bcrypt.genSalt(saltRound, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                //Store hash into DB
                console.log(password);
                console.log(salt);
                console.log(hash);

                const sql = "INSERT INTO users SET ?";
                conn.query(sql, { username, password: hash, email, userItems: defaultItems }, (err, res, fields) => {
                    if (err) throw err;
                    console.log(res);
                });
            })
        });
        console.log('User情報を保存しました。')
        res.redirect('/homepage/:id');
    } catch (e) {
        console.log(e)
        res.redirect('/register');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('login');
};

module.exports.login = (req, res) => {
    //すでにここではpassport.authenticateによって認証が終わっている
    req.session.user = req.user;
    res.redirect('/homepage/:id');
}

module.exports.logout = (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('/login');
    });
};