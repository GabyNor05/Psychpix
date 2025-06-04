const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/', async (req, res) => {
  console.log('Received body:', req.body);

  try {
    // Add timestamp here
    const { comment, likes, rating, userId, itemId, username, profilePic, timestamp } = req.body;
    const newComment = new Comment({
      comment,
      likes,
      rating,
      userId,
      itemId,
      username,
      flags: 0,
      profilePic,
      timestamp, // Now this will be defined
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

router.put('/:id/likes', async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (typeof likes !== 'number') {
    return res.status(400).json({ message: 'Likes must be a number.' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { likes }, { new: true, runValidators: true });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error('Error updating likes:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/flags', async (req, res) => {
  const { id } = req.params;
  const { flags } = req.body;

  if (typeof flags !== 'number') {
    return res.status(400).json({ message: 'Flags must be a number.' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { flags }, { new: true, runValidators: true });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error('Error updating flags:', err.message);
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