const express = require('express')

const router = express.Router()

const contactController = require('../../controllers/contacts')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.use(authMiddleware);

router.get('/', contactController.get)

router.get('/:contactId', contactController.getById)

router.post('/', contactController.create)

router.delete('/:contactId', contactController.remove)

router.put('/:contactId', contactController.update)

router.patch('/:contactId/favorite', contactController.updateStatusContact)

module.exports = router
