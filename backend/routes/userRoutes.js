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

const newUser = new User({
  name: 'Leela',
  email: 'leela@futurama.com',
  password: 'qwerty123'
});

newUser.save()
  .then(doc => console.log('User saved:', doc))
  .catch(err => console.error('Error saving user:', err));

module.exports = router; // ✅ exports a router function