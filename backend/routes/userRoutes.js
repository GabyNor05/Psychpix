const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  console.log('Received body:', req.body); // Log the incoming data

  try {
    const { username, email, password, twoFactor } = req.body; // <-- ADD twoFactor here
    const newUser = new User({ username, email, password, twoFactor });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Validation error:', err.message); // Log validation errors
    res.status(400).json({ message: err.message });
  }
});

router.get('/', (req, res) => {
  res.send('User route works!');
});

const newUser = new User({
  username: 'Leela',
  email: 'leela@futurama.com',
  password: 'qwerty123'
});

module.exports = router; // ✅ exports a router function