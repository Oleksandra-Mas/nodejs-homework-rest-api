const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../models/contacts');
  
const {createContactSchema} = require('../schemas/contactSchema')

const getAll = async () => {
  const contacts = await listContacts();
  return contacts;
};

const getById = async contactId => {
  const contact = await getContactById(contactId);
  return contact;
};

const remove = async contactId => {
  const contact = await removeContact(contactId);
  return contact;
};

const add = async body => {
    const validation = createContactSchema.validate(body);
    if (validation.error) {
        const errorMessage = validation.error.details[0].message;
        throw new Error(errorMessage);
    }
    const newContact = addContact(body);
  return newContact;
};

const update = async (contactId, body) => {
    const validation = createContactSchema.validate(body);
    if (validation.error) {
        const errorMessage = validation.error.details[0].message;
        throw new Error(errorMessage);
    }
  const updatedContact = updateContact(contactId, body);
  return updatedContact;
};

module.exports = {
    getAll,
    getById,
    remove,
    add,
    update,
  };
  

