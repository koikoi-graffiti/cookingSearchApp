const express = require('express');
const router = express.Router();

const passport = require('passport'); //passport

const userController = require('../controllers/user');

//ユーザー登録, ログイン
router.get('/register', userController.renderRegisterForm);

router.post('/register', userController.createUser);

router.get('/login', userController.renderLoginForm);

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userController.login );

router.post('/logout', userController.logout);

module.exports = router;