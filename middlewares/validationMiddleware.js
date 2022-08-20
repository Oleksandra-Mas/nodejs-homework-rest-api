const { userSchema } = require('../service/schemas/users');
const { contactSchema } = require('../service/schemas/contacts');
const { getUserByEmail } = require('../service/user');

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

const resendTokenValidationMiddleware = async (req, _, next) => {
  const { email } = req.body;
  if (!email) {
    const error = new Error('missing required field email');
    error.status = 400;
    next(error);
  }

  const user = await getUserByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    error.status = 400;
    next(error);
  }

  if (user?.verify) {
    const error = new Error('Verification has already been passed');
    error.status = 400;
    next(error);
  }
  req.verificationToken = user.verificationToken;

  next();
};

module.exports = {
  userValidationMiddleware,
  contactValidationMiddleware,
  resendTokenValidationMiddleware,
};
