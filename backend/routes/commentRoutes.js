const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/', async (req, res) => {
  console.log('Received body:', req.body);

  try {
    const { comment, rating, userId } = req.body; 
    const newComment = new Comment({ userId, comment, rating, likes: 0, timestamp: new Date(), });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Validation error:', err.message);
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const items = await Comment.find(); 
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const items = await Comment.findById(req.params.id);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const item = await Comment.findByIdAndDelete(req.params.id); 
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 