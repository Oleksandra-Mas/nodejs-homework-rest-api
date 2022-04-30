const express = require('express')

const router = express.Router()

const usersController = require('../../controllers/users')
const { authMiddleware } = require('../../middlewares/authMiddleware')
    

router.post('/register', usersController.register)

router.post('/login', usersController.login)

router.post('/logout', authMiddleware, usersController.logout)

router.get('/current', authMiddleware, usersController.getCurrent)

module.exports = router
