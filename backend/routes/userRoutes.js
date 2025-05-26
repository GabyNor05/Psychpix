const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to register a new user
router.post('/register', async (req, res) => {
  console.log('Received body:', req.body); // Log the incoming data

  try {
    // Destructure user info from request body, including twoFactor array
    const { username, email, password, twoFactor } = req.body;
    // Create a new User document
    const newUser = new User({ username, email, password, twoFactor });
    // Save the user to the database
    const savedUser = await newUser.save();
    // Respond with the saved user
    res.status(201).json(savedUser);
  } catch (err) {
    // Log and return validation errors
    console.error('Validation error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Simple test route to check if user route works
router.get('/', (req, res) => {
  res.send('User route works!');
});

// Example: Create and save a user (for testing/demo purposes)
const newUser = new User({
  username: 'Leela',
  email: 'leela@futurama.com',
  password: 'qwerty123'
});

newUser.save()
  .then(doc => console.log('User saved:', doc))
  .catch(err => console.error('Error saving user:', err));

// Route to check username & password only (step 1 of login)
router.post('/check', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });
    // Check password
    if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });
    // If correct, respond with success
    res.status(200).json({ message: "Credentials correct" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route for 2-factor login (step 2)
router.post('/login', async (req, res) => {
  const { username, password, twoFactor } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });
    // Check password
    if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });
    // Check 2-factor authentication (array comparison)
    if (!twoFactor || !Array.isArray(twoFactor) || user.twoFactor.join(",") !== twoFactor.join(",")) {
      return res.status(401).json({ message: "2-factor authentication failed" });
    }
    // If all checks pass, login is successful
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // Export the router for use in the main app