const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;
const BASE_EMAIL = 'sashamasyuk0702@gmail.com';

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  await sgMail.send({ ...data, from: BASE_EMAIL });
  return true;
};

module.exports = sendEmail;
