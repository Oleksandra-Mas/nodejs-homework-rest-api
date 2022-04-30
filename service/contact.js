const { Contact } = require('./schemas/contacts');

const getAllContacts = async () => {
    return Contact.find()
}

const getContactById = async (id) => {
    return Contact.find({_id:id})
}

const createContact = async (body) => {
    return Contact.create(body);
}

const removeContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

const updateContact = (id, body) => {
    return Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
  }

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    removeContact,
    updateContact
}