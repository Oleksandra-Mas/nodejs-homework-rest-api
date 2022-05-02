const express = require('express')

const router = express.Router()

const contactController = require('../../controllers/contacts')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { contactValidationMiddleware } = require('../../middlewares/validationMiddleware')

router.use(authMiddleware);

router.get('/', contactController.get)

router.get('/:contactId', contactController.getById)

router.post('/',contactValidationMiddleware, contactController.create)

router.delete('/:contactId', contactController.remove)

router.put('/:contactId',contactValidationMiddleware, contactController.update)

router.patch('/:contactId/favorite', contactController.updateStatusContact)

module.exports = router
