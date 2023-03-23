const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/** GET Messages */
router.get('/', messageController.messages_list);



module.exports = router;