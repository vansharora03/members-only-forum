const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    title: String,
    time_stamp: Date,
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Message', MessageSchema);