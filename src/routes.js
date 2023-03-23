const express = require("express");
const authentication = require('../middleware/auth');
const admin = require('../middleware/admin');
const genres = require('../routes/genres');
const customers = require('../routes/customer');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error'); 

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/genres', [authentication,admin] , genres);
    app.use('/api/customres', authentication, customers);
    app.use('/api/movies', authentication, movies);
    app.use('/api/rentals', authentication, rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error); // Error Handling
}