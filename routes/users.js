const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/** GET Sign-up */
router.get('/sign-up', userController.sign_up_GET);

/** POST Sign-up */
router.post('/sign-up', userController.sign_up_POST);

/** GET Log-in */
router.get('/log-in', userController.log_in_GET);

/** POST Log-in */
router.post('/log-in', userController.log_in_POST);

/** GET Log-out */
router.get('/log-out', userController.log_out_GET);

module.exports = router;
