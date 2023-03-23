const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    isGold: {
        isGold: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
exports.customerSchema = customerSchema;