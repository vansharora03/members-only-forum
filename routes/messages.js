const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/** GET Messages */
router.get('/', messageController.messages_list);

/** GET Sign-up */
router.get('/sign-up', messageController.sign_up_GET);

module.exports = router;