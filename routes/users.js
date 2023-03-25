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

/** GET Member-key form */
router.get('/member-key', userController.member_key_GET);

/** POST Member-key form */
router.post('/member-key', userController.member_key_POST);

/** GET Admin-key form */
router.get('/admin-key', userController.admin_key_GET);

/** POST Admin-key form */
router.post('/admin-key', userController.admin_key_POST);

module.exports = router;
