const express = require("express");
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const validateMovie = require('../validations/movie');
const Movie = require('../models/movies');
const { Genre }  = require('../models/genre');

router.get('/', asyncMiddleware(async(req,res)=> {
    const movies = await Movie.find().sort({ name: 1});
    return res.send(movies);
}));

router.get('/:id', asyncMiddleware(async (req,res)=> {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("Invalid Id");

    return res.send(movie);
}));

router.post('/', asyncMiddleware(async (req,res)=>{
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre Id');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();

    return res.send(movie)
}));

router.put('/:id',asyncMiddleware(async (req,res)=>{
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
        }, {new: true});
     
    if(!movie) return res.status(404).send("Invalid Id");

    return res.send(movie);
}));

router.delete('/:id', asyncMiddleware(async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send("Invalid Id");

    return res.send(movie);
}));

module.exports = router;