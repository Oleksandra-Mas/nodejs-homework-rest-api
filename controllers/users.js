const jwt = require('jsonwebtoken');
require('dotenv').config();
const { userSchema } = require('../service/schemas/users');
const { getUserByEmail, registerUser, getUserByEmailAndPassword, updateToken } = require('../service/user');

const register = async (req, res, next) => {
    try {
        const { body } = req;

        const validation = userSchema.validate(body);

        if (validation.error) {
            const errorMessage = validation.error.details[0].message;
            return res.status(400).json({
              status: 'error',
              code: 400,
              message: errorMessage,
            });
        }
        
        const user = await getUserByEmail(body.email);
        if (user) {
            return res.status(409).json({
              status: 'error',
              code: 409,
              message: 'Email in use',
            });
        }

        const created = await registerUser(body);

        const token = jwt.sign({id:created._id}, process.env.SECRET_KEY, {expiresIn:'10h'});
        const result = await updateToken({ token, user: created });
        
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                user: result
            }
        });
    } catch ({message}) {
       res.status(400).json({
        status: 'error',
        code: 400,
        message,
      });
    }
}


const login = async (req, res, next) => {
    try {
        const { body } = req;
        const validation = userSchema.validate(body);

        if (validation.error) {
            const errorMessage = validation.error.details[0].message;
            return res.status(400).json({
              status: 'error',
              code: 400,
              message: errorMessage,
            });
        }
        
        const user = await getUserByEmailAndPassword(body);
        if (!user) {
            return res.status(401).json({
              status: 'error',
              code: 401,
              message: "Email or password is wrong",
            });
        }

        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'10h'});
        const result = await updateToken({ token, user });

        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                user: result
            }
        });
    } catch ({message}) {
       res.status(400).json({
        status: 'error',
        code: 400,
        message,
      });
    }
}

const logout = async (req, res, next) => {
    try {
        const { user } = req;
    await updateToken({token:null, user})
       res.status(204).send();
    }
    catch ({message}) {
        res.status(400).json({
         status: 'error',
         code: 400,
         message,
       });
     }
}

const getCurrent = async (req, res, next) => {
    try {
        const { user } = req;
        res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user
        }
    });
     }
     catch ({message}) {
         res.status(400).json({
          status: 'error',
          code: 400,
          message,
        });
      }
 }

module.exports = {
    register,
    login,
    logout,
    getCurrent
}