const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { authenticateJWT, requireAdmin } = require('../middleware/auth');
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Add this at the top
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Utility to generate 7 random notes
function generateRandomNotes() {
  const notes = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
  let result = [];
  for (let i = 0; i < 7; i++) {
    result.push(notes[Math.floor(Math.random() * notes.length)]);
  }
  return result;
}

// Route to register a new user
router.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, email, password, role, adminToken } = req.body;

  let userRole = "customer";
  if (role === "admin") {
    if (adminToken === process.env.ADMIN_INVITE_TOKEN) {
      userRole = "admin";
    } else {
      return res.status(403).json({ message: "Invalid admin invite token" });
    }
  }

  try {
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword, role: userRole });
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

// Route to get current user info
router.get('/me', async (req, res) => {
  const username = req.query.username || req.headers['x-username'];
  if (!username) return res.status(400).json({ message: "Username required" });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get user by id
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
    // Check password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Incorrect password" });
    // If correct, respond with success
    res.status(200).json({ message: "Credentials correct" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route for 2-factor login (step 2)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });
    // Check password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Incorrect password" });
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
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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

// Route to send 2FA notes to email (supports both signup and login)
router.post('/send-2fa-notes', async (req, res) => {
  const { email, username } = req.body;
  let targetEmail = email;

  // If no email provided, look up by username (for login)
  if (!targetEmail && username) {
    const user = await User.findOne({ username });
    if (!user || !user.email) {
      return res.status(404).json({ message: "User not found or missing email" });
    }
    targetEmail = user.email;
  }

  if (!targetEmail) {
    return res.status(400).json({ message: "Email required" });
  }

  const notes = generateRandomNotes();

  try {
    // Send to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: targetEmail,
      subject: "Your Psychedelic Pixels 2FA Notes",
      text: `Your login notes: ${notes.join(", ")}`
    });

    // Also send to admin email
    if (targetEmail !== process.env.EMAIL_USER) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "2FA Notes Sent to User",
        text: `2FA notes sent to ${targetEmail}: ${notes.join(", ")}`
      });
    }

    res.json({ notes });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router; // Export the router for use in the main app


