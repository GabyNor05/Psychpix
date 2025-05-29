const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true, unique: true },
  rating: { type: Number, required: true },
  replies: { type: String, required: true, unique: true },
  timestamp: { type: Date, required: true }, 
  likes: { type: Number, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);