const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(10).max(30),

  phone: Joi.string()
    .min(10)
    .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
    .max(30),

  favorite: Joi.boolean(),
})

const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
})

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 10,
      maxlength: 30,
    },
    phone: {
      type: String,
      minlength: 10,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 30,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contact)

module.exports = { Contact, contactSchema, contactFavoriteSchema }
