const express = require('express');
const router = express.Router({mergeParams: true});

const { User } = require('../models/user'); //User - Models

const{ isLoggedIn } = require('../middleware'); //middleware

router.get('/:id', isLoggedIn, async (req, res) => {
    const { _id } = req.session.user;
    const loggedinUser = await User.findById(_id);
    res.render('home', {loggedinUser})
});

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const loggedinUser = await User.findById(req.params.id)
    res.render('edit', {loggedinUser});
});

router.post('/:id', isLoggedIn, async (req, res) => {
    const items = req.body.fridgeItem
    const loggedinUser = req.session.user;
    await User.findByIdAndUpdate(loggedinUser._id, {ingredients: items});
    res.redirect('/homepage/:id')
});

module.exports = router;