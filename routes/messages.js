const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/** GET Messages */
router.get('/', messageController.messages_list);

router.post('/', messageController.messages_POST);



module.exports = router;