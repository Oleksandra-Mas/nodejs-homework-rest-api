const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(10).max(30),

  phone: Joi.string()
    .min(10)
    .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
    .max(30),
});

module.exports = {
  createContactSchema,
};
