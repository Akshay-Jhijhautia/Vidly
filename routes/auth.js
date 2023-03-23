const bcrypt = require('bcrypt');
const User = require('../models/users');
const validate = require('../validations/auth');
const asyncMiddleware = require('../middleware/async');
const express = require("express");
const router = express.Router();

router.post('/', asyncMiddleware(async (req,res)=> {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Email or Password");

    const token = user.generateAuthToken();

    res.send(token);
}));

module.exports = router;