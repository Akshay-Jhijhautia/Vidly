const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function () {
    mongoose.connect(process.env.Mongo_Url)
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.log("Could not connect to mongoDb", err))
}