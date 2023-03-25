const Message = require('../models/Message');
const User = require('../models/User');
const {body, validationResult} = require('express-validator');

exports.messages_list = async (req, res, next) => {
    // Get all messages
    try {
        const messages = await Message.find().populate("author")
        // No errors, render the messages
        res.render('messages', {title: "Messages", message_list: messages, user: req.user})
    } catch (err) {
        console.log(err)
        next(err);
    }
}

exports.messages_POST = [
    // Sanitation and validation
    body("title")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("Title is required."),
    body("message")
        .trim()
        .escape(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // Resend form with errors
            const messages = await Message.find().populate("author");
            res.render("messages", {title: "Messages", attempt: req.body.message, message_title: req.body.title, error_list: errors.array(), message_list: messages, user: req.user});
            return;
        }
        // Send message
        try {
            const author = await User.findOne({username: req.user.username})
            const message = new Message({
                title: req.body.title,
                time_stamp: new Date(),
                content: req.body.message,
                author: author
            })
            message.save()
        } catch (err) {
            next(err);
        }
        res.redirect('/messages')
    }

]

// Fix idk
exports.message_delete_POST = async (req, res, next) => {
    try {
        await Message.findOneAndRemove({_id: req.params.id})
        res.redirect("/messages")
    } catch (err) {
        next(err);
    }
}


