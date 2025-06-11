const mongoose = require('mongoose');

const UserReplySchema = new mongoose.Schema({
  username: { type: String, required: true },
  timestamp: { type: String, required: true },
  comment: { type: String, required: true },
  profilePic: { type: String },
  likes: { type: Number },
  flags: { type: Number },
});

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { type: String, required: true }, 
  likes: { type: Number},
  flags: { type: Number},
  replies: [UserReplySchema],
  userId: { type: String },
  itemId: { type: String },
  username: { type: String },  
  profilePic: { type: String },  
  itemTitle: { type: String },
  itemImageUrl: { type: String } 
});

module.exports = mongoose.model('Comment', CommentSchema);