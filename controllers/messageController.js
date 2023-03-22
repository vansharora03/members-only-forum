const Message = require('../models/Message');
const User = require('../models/User');

exports.messages_list = async (req, res, next) => {
    // Get all messages
    try {
        const messages = await Message.find().populate("author")
        // No errors, render the messages
        res.render('messages', {title: "Messages", message_list: messages})
    } catch (err) {
        console.log(err)
        next(err);
    }
}