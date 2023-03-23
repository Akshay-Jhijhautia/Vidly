const Joi = require('joi');

function validateRental(rental){
    const schema = Joi.object({
       customerId: Joi.string().required(),
       movieId: Joi.string().required()
    });

    return schema.validate(rental);
};

module.exports = validateRental;