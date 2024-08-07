const express = require('express');
const app = express();

//mysql DB
const mysql = require('mysql2');

const bcrypt = require('bcrypt');

const passport = require('passport'); //passport
const LocalStrategy = require('passport-local');

const session = require('express-session'); //session
//const { User } = require('./models/user'); //User - Models
const flash = require('connect-flash'); //flash

const path = require('path');
const ejsMateEngine = require('ejs-mate');

const fridgeHomepage = require('./routes/fridgeHomepage');
const userRoutes = require('./routes/users');

app.engine('ejs', ejsMateEngine);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public'))); //静的ファイル
app.use(express.urlencoded({ extended: true }));

//session setup
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    resave: false,
}));

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xnkdr@2426",
    database: "cookingSearchDB"
});

//passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function verify(username, password, cb) {
    const sql = `SELECT * FROM users WHERE username = '${username}'`
    conn.query(sql, async (err, row) => {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        bcrypt.compare(password, row.password, (err, result) => {
            return cb(null, row);
            if(err) {return cb(null, false, { message: 'Incorrect username or password.' });}
        });
    });
}));

passport.serializeUser((user, cb) => {
    process.nextTick(function() {
        console.log('serializer called!');
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(async (user, cb) => {
    console.log('deserializer called!');
    process.nextTick(function() {
        return cb(null, user);
    });
});

app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//users routes set
app.use('/', userRoutes);
//homepage routes set
app.use('/homepage', fridgeHomepage);

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中。')
});