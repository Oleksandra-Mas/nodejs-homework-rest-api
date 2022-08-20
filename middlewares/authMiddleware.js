const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { User } = require('../service/schemas/users');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(createError(401, 'Not authorized'));
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      next(createError(401, 'Not authorized'));
    }

    const { id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select({ password: 0 });

    if (!user || user.token !== token || !user.verify) {
      next(createError(401, 'Not authorized'));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(createError(401, 'Not authorized'));
  }
};

module.exports = {
  authMiddleware,
};
