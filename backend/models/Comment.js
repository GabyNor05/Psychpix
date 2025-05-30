const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true, unique: true },
  rating: { type: Number, required: true },
  timestamp: { type: Date, required: true }, 
  likes: { type: Number},
  replies: { type: String, sparse: true},
  userId: { type: String },
  itemId: { type: String },
});

module.exports = mongoose.model('Comment', CommentSchema);