const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { authenticateJWT, requireAdmin } = require('../middleware/auth');
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Route to register a new user
router.post('/register', async (req, res) => {
  console.log(req.body); // <-- Add this line
  const { username, email, password, role, adminToken, twoFactor } = req.body;

  let userRole = "customer";
  if (role === "admin") {
    if (adminToken === process.env.ADMIN_INVITE_TOKEN) {
      userRole = "admin";
    } else {
      return res.status(403).json({ message: "Invalid admin invite token" });
    }
  }

  try {
    const newUser = new User({ username, email, password, twoFactor, role: userRole });
    const savedUser = await newUser.save();
    res.status(201).json({
      user: {
        username: savedUser.username,
        role: savedUser.role,
        email: savedUser.email,
        id: savedUser._id,
        profilePic: savedUser.profilePic || ""
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
        const item = await User.findById(req.params.id); // Gets all users
        res.json(item);
      } 
    catch (err) {
      console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
        const items = await User.find(); // Gets all users
        res.json(items);
      } 
    catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

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
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      token,
      user: {
        username: user.username,
        role: user.role,
        email: user.email,
        id: user._id,
        profilePic: user.profilePic // <-- Add this line
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get current user info
router.get('/me', async (req, res) => {
  const username = req.query.username || req.headers['x-username'];
  if (!username) return res.status(400).json({ message: "Username required" });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      _id: user._id, // Add this line
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update current user info
router.put('/me', async (req, res) => {
  const username = req.query.username || req.body.username;
  if (!username) return res.status(400).json({ message: "Username required" });
  try {
    const update = {};
    if (req.body.newUsername) update.username = req.body.newUsername;
    if (req.body.email) update.email = req.body.email;
    if (req.body.profilePic) update.profilePic = req.body.profilePic; // <-- ADD THIS LINE
    const user = await User.findOneAndUpdate({ username }, update, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protect a route for admins only
router.get('/admin/some-data', authenticateJWT, requireAdmin, (req, res) => {
  // Only admins can access this
  res.json({ secret: "admin stuff" });
});

module.exports = router; // Export the router for use in the main app


