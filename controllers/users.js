const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
require('dotenv').config();
const fs = require('fs/promises');
const Jimp = require('jimp');

const {
  getUserByEmail,
  registerUser,
  getUserByEmailAndPassword,
  updateToken,
  changeAvatar,
} = require('../service/user');
const { addToAvatarsPath } = require('../helpers/path');

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await getUserByEmail(body.email);
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }

    const avatarURL = gravatar.url(body.email, { protocol: 'http', s: '100' });
    const created = await registerUser({ ...body, avatarURL });

    const token = jwt.sign({ id: created._id }, process.env.SECRET_KEY, {
      expiresIn: '10h',
    });
    const result = await updateToken({ token, user: created });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: result,
      },
    });
  } catch ({ message }) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await getUserByEmailAndPassword(body);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '10h',
    });
    const result = await updateToken({ token, user });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        user: result,
      },
    });
  } catch ({ message }) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const logout = async (req, res, next) => {
  try {
    const { user } = req;
    await updateToken({ token: null, user });
    res.status(204).send();
  } catch ({ message }) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { user } = req;
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        user,
      },
    });
  } catch ({ message }) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const updateAvatar = async (req, res, next) => {
  const { user, file } = req;
  const { path: filePath, originalname } = file;
  try {
    const image = await Jimp.read(filePath);
    const { newPath, avatarUrl } = addToAvatarsPath(originalname);
    image.resize(250, 250).write(newPath);
    changeAvatar({ user, avatarUrl });
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: avatarUrl,
      },
    });
  } catch ({ message }) {
    fs.unlink(filePath);
    res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
};
