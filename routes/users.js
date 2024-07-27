const express = require('express');
const router = express.Router();

const passport = require('passport'); //passport

//ユーザー登録, ログイン
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const defaultIngredients = ['ご飯', '納豆', '味噌汁', 'きゅうり'];
        const user = new User({ email, username, ingredients: defaultIngredients })
        console.log(user);
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if(err) return next(err)
            res.redirect('/homepage')
        })
    } catch (e) {
        console.log(e)
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    //すでにここではpassport.authenticateによって認証が終わっている
    req.session.user = req.user;
    res.redirect('/homepage/:id');
});

router.post('/logout', (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;