const express = require('express')

const router = express.Router()

const contactController = require('../../controllers/contacts')

router.get('/', contactController.get)

router.get('/:contactId', contactController.getById)

router.post('/', contactController.create)

router.delete('/:contactId', contactController.remove)

router.put('/:contactId', contactController.update)

router.patch('/:contactId/favorite', contactController.updateStatusContact)

module.exports = router
