const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true,},
  rating: { type: Number, required: true },
  timestamp: { type: String, required: true }, 
  likes: { type: Number},
  flags: { type: Number},
  replies: { type: String, sparse: true},
  userId: { type: String },
  itemId: { type: String },
  username: { type: String },  
  profilePic: { type: String },  
  itemTitle: { type: String },
  itemImageUrl: { type: String } 

});

module.exports = mongoose.model('Comment', CommentSchema);