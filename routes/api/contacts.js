const express = require('express');

const router = express.Router();

const {
  getAll,
  getById,
  remove,
  add,
  update,
} = require('../../controllers/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await getAll();
  res.json({ contacts }).status(200);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getById(req.params.contactId);
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
  try {
    const contact = await add(body);
    res.json({ ...contact }).status(201);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await remove(req.params.contactId);
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
  try {
    const contact = await update(params.contactId, body);
    if (!contact) {
      return res.status(404).send({ message: 'Not found' });
    }
    res.json({ ...contact }).status(200);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
