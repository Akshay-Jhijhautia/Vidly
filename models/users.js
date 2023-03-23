const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_Private_Key);
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;