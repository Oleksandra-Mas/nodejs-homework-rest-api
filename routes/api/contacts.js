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
    return res.status(404).send({ message: 'Not found' });
  }
  res.json({ ...contact }).status(200);
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.email || !body.phone) {
    return res.status(400).send({ message: 'missing required name field' });
  }
  const contact = await addContact(body);
  res.json({ ...contact }).status(201);
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    return res.status(404).send({ message: 'Not found' });
  }
  res.json({ message: 'contact deleted' }).status(200);
});

router.put('/:contactId', async (req, res, next) => {
  const { body, params } = req;
  if (!body.name && !body.email && !body.phone) {
    return res.status(400).send({ message: 'missing required fields' });
  }
  const contact = await updateContact(params.contactId, body);
  if (!contact) {
    return res.status(404).send({ message: 'Not found' });
  }
  res.json({ ...contact }).status(200);
});

module.exports = router;
