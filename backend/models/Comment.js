const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true, unique: true },
  rating: { type: Number, required: true },
  timestamp: { type: Date, required: true }, 
  likes: { type: Number},
  flags: { type: Number},
  replies: { type: String, sparse: true},
  userId: { type: String },
  itemId: { type: String },
  username: { type: String },    // Added field
  profilePic: { type: String },  // Added field
  timestamp: { type: String, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);