const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch(err){
        res.status(400).json({ error: err.message })
    }
});

router.get('/', (req, res) => {
  res.send('User route works!');
});

module.exports = router; // ✅ exports a router function