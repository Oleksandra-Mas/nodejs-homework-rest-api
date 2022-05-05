const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Joi = require('joi');

const userSchema = Joi.object({
    password: Joi.string().alphanum().min(6).max(15).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(5)
        .max(30).required(),

    token: Joi.string(),
        
  subscription: Joi.string().default("starter").valid("starter", "pro", "business"),
  avatarURL: Joi.string().default(false),
  verify: Joi.boolean(),
  verificationToken: Joi.string()
});

const user = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
      },
    { versionKey: false, timestamps: true }
  );
  
const User = mongoose.model("user", user);
  
  module.exports = {User, userSchema};
  