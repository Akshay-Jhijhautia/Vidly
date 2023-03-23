const Joi = require('joi');

function validateCustomer(customer){
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
};

module.exports = validateCustomer;