const express = require('express');
const router = express.Router({mergeParams: true});

const{ isLoggedIn } = require('../middleware'); //middleware

const frdigeHomepageController = require('../controllers/fridgeHomepage')

router.get('/:id', isLoggedIn, frdigeHomepageController.renderHomepage );

router.post('/:id', isLoggedIn, frdigeHomepageController.updateFridgeItems );

router.get('/:id/edit', isLoggedIn, frdigeHomepageController.renderEditForm );

module.exports = router;