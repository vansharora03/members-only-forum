const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/** GET Sign-up */
router.get('/sign-up', userController.sign_up_GET);

/** POST Sign-up */
router.post('/sign-up', userController.sign_up_POST);

module.exports = router;
