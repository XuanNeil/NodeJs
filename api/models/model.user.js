const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, require: true},
    password: {type: String, require: true}
});

const User = mongoose.model('User', UserSchema, "User");
module.exports = User;