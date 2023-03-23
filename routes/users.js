const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/users');
const asyncMiddleware = require('../middleware/async');
const validateUser = require('../validations/user');
const express = require("express");
const router = express.Router();

router.get('/me', auth, async (req,res)=> {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', asyncMiddleware(async (req,res)=> {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const users = await User.findOne({ email : req.body.email });
    if(users) return res.status(400).send("User Already Exists");

    const user = new User(_.pick(req.body,['name','email','password','isAdmin']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
     
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user,['id','name','email','isAdmin']));
}));

module.exports = router;