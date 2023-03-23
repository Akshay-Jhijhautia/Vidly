const asyncMiddleware = require('../middleware/async');
const { Genre }  = require('../models/genre');
const validateGenre = require('../validations/genres');
const express = require("express");
const router = express.Router();

router.get('/', asyncMiddleware(async (req,res) => {
    const genres = await Genre.find().sort({ name: 1})
    res.send(genres);
}));

router.get('/:id', asyncMiddleware(async (req,res)=> {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("Genre not available");
    return res.send(genre);
}));

router.post('/', asyncMiddleware(async (req,res)=> {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = new Genre({name : req.body.name });

    await genre.save();
    return res.send(genre);
}));

router.put('/:id', asyncMiddleware(async (req,res)=> {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name : req.body.name
    }, { new : true});
    if(!genre) return res.status(404).send("Genre not available");

    return res.send(genre);
}));

router.delete('/:id', asyncMiddleware(async (req,res)=> {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send("Genre not available");

    return res.send(genre);
}));

module.exports = router;