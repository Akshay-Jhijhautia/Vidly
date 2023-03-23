const express = require("express");
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const { Customer }= require('../models/customer');
const validateCustomer = require('../validations/customer');

router.get('/', asyncMiddleware(async (req,res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
}));

router.get('/:id', asyncMiddleware(async (req,res)=> {
    const customers = await Customer.findById(req.params.id);
    if(!customers) return res.status(404).send("Genre not available");
    return res.send(customers);
}));

router.post('/', asyncMiddleware(async (req,res)=> {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = new Customer({
        name : req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    await customer.save();
    return res.send(customer);
}));

router.put('/:id', asyncMiddleware(async (req,res)=> {
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new : true});
    if(!customer) return res.status(404).send("Genre not available");

    return res.send(customer);
}));

router.delete('/:id', asyncMiddleware(async (req,res)=> {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("Genre not available");

    return res.send(customer);
}));

module.exports = router;