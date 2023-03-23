const { Customer } = require('../models/customer');
const Movie = require('../models/movies');
const Rental = require('../models/rentals');
const asyncMiddleware = require('../middleware/async');
const validateRental = require('../validations/rentals');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req,res)=> {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    return res.send(rentals);
}));

router.get('/:id', asyncMiddleware(async(req,res)=> {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("Invalid Id");

    return res.send(rental);
}));

router.post('/', asyncMiddleware(async(req,res)=>{
    const { error } = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid Customer");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid Movie");

    if(movie.numberInStock === 0) return res.status(400).send("Movie Not in Stock");

    const rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    await rental.save();

    movie.numberInStock--;
    movie.save();

    return res.send(rental);
}));

module.exports = router;