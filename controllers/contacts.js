const service = require('../service/contact');
const { contactFavoriteSchema } = require('../service/schemas/contacts');

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
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

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId)[0];
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    }
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  } catch ({ message }) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.createContact({ favorite: false, ...body });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    });
  } catch ({ message }) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const update = async (req, res, next) => {
  const { body, params } = req;
  try {
    const result = await service.updateContact(params.contactId, body);
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    }
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${params.contactId}`,
      data: 'Not Found',
    });
  } catch ({ message }) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;

  if (!favorite && favorite !== false) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required field',
      data: 'Not Found',
    });
  }

  const validation = contactFavoriteSchema.validate(req.body);

  if (validation.error) {
    const errorMessage = validation.error.details[0].message;
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: errorMessage,
    });
  }

  try {
    const result = await service.updateContact(contactId, { favorite });
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      });
    }
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  } catch ({ message }) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.removeContact(contactId);
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      });
    }
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  } catch ({ message }) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message,
    });
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
};
