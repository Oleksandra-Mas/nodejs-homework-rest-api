const { userSchema } = require('../service/schemas/users');
const { contactSchema } = require('../service/schemas/contacts');

const userValidationMiddleware = async (req, res, next) => {
  const { body } = req;
  const validation = userSchema.validate(body);
  if (validation.error) {
    const errorMessage = validation.error.details[0].message;
    const error = new Error(errorMessage);
    error.status = 400;
    next(error);
  }
  next();
};
const contactValidationMiddleware = async (req, _, next) => {
  const { body } = req;

  if (!body.name || !body.email || !body.phone) {
    const error = new Error('missing required field');
    error.status = 400;
    next(error);
  }

  const validation = contactSchema.validate(body);

  if (validation.error) {
    const errorMessage = validation.error.details[0].message;
    const error = new Error(errorMessage);
    error.status = 400;
    next(error);
  }
  next();
};
module.exports = {
  userValidationMiddleware,
  contactValidationMiddleware
};
