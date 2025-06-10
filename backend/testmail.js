const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // or any email you want to test with
  subject: 'Test',
  text: 'Hello'
}, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Sent:', info.response);
  }
});