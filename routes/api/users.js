const express = require('express')

const router = express.Router()

const usersController = require('../../controllers/users')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { userValidationMiddleware } = require('../../middlewares/validationMiddleware')
    

router.post('/register', userValidationMiddleware, usersController.register)

router.post('/login', userValidationMiddleware, usersController.login)

router.post('/logout', authMiddleware, usersController.logout)

router.get('/current', authMiddleware, usersController.getCurrent)

module.exports = router