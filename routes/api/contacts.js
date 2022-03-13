const express = require('express');

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts }).status(200);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).send({ message: 'Not found'});
  }
  res.json({ contact, status: 200 }).status(200);
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    return res.status(404).send({ message: 'Not found'});
  }
  res.json({ message: "contact deleted" }).status(200);
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
