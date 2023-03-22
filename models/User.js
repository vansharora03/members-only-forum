const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    is_vip: Boolean
})

module.exports = mongoose.model("User", UserSchema);