const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/users', async (req, res) => {
  console.log('Received body:', req.body); // Log the incoming data

  try {
    const { username, email, password } = req.body;
    // Or use { name, email, password } if your schema expects 'name'
    const newUser = new User({ username, email, password });
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

newUser.save()
  .then(doc => console.log('User saved:', doc))
  .catch(err => console.error('Error saving user:', err));

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // ✅ exports a router function