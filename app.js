const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dbConfig = require("./models/config/db");

const passport = require('passport'); //passport
const LocalStrategy = require('passport-local');

const session = require('express-session'); //session
const { User } = require('./models/user'); //User - Models
const flash = require('connect-flash'); //flash

const path = require('path');

const homepageRoutes = require('./routes/recipePage');
const userRoutes = require('./routes/users')

app.set('view engine', 'ejs');

app.use(flash());
app.use(express.static(path.join(__dirname, 'public'))); //静的ファイル
app.use(express.urlencoded({ extended: true }));

//session setup
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect mongoDB by mongoose
mongoose.connect( dbConfig.url,
    { 
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDBコネクションOK！！');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー！！！');
        console.log(err);
        process.exit();
    });

//users routes set
app.use('/', userRoutes);
//homepage routes set
app.use('/homepage', homepageRoutes);

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中。')
});