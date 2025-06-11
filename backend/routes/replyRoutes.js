// routes/replyRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

function formatTimestamp(dateObj) {
    const pad = n => n < 10 ? '0' + n : n;
    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());
    let hour = dateObj.getHours();
    const min = pad(dateObj.getMinutes());
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // 0 should be 12
    return `${day}/${month}/${year} ${hour}:${min} ${ampm}`;
}

// POST a reply to a specific comment
router.post('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { username, comment, profilePic } = req.body;

  if (!username || !comment) {
    return res.status(400).json({ error: 'Missing username or comment' });
  }

  try {
    const foundComment = await Comment.findById(commentId);
    if (!foundComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const newReply = {
      username,
      comment,
      timestamp: formatTimestamp(new Date()),
      profilePic,
      likes: 0,
      flags: 0,
    };

    foundComment.replies.push(newReply);
    await foundComment.save();

    res.status(201).json({ message: 'Reply added', reply: newReply });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT like or flag a reply inside a comment
router.put('/:commentId/replies/:replyId/:action', async (req, res) => {
  const { commentId, replyId, action } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = comment.replies.id(replyId); // Mongoose magic: finds subdocument by _id
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (action === 'like') {
      reply.likes = (reply.likes || 0) + 1;
    } else if (action === 'flag') {
      reply.flags = (reply.flags || 0) + 1;
    } else if (action === 'resetflag') {
      reply.flags = 0;
    } else {
      return res.status(400).json({ message: 'Invalid action. Use "like", "flag", or "resetflag".' });
    }

    await comment.save();
    res.status(200).json({ message: `Reply ${action}ed successfully`, reply });
  } catch (err) {
    console.error(`Error ${action}ing reply:`, err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:commentId/replies/:replyId/delete', async (req, res) => {
  const { commentId, replyId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const originalLength = comment.replies.length;
    comment.replies = comment.replies.filter(reply => reply._id.toString() !== replyId);

    if (comment.replies.length === originalLength) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    await comment.save();
    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (err) {
    console.error('Error deleting reply by _id:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
