const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const updatedContact = { ...body, id: contactId };
  contacts.splice(contactIdx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
