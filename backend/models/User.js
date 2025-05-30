const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, default: 1 }
});

const UserSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  twoFactor:  { type: [String], required: true },
  profilePic: { type: String },
  commentsId: { type: [String] },
  role:       { type: String, enum: ['customer', 'admin'], default: 'customer' },
  cart: [CartItemSchema]
});

module.exports = mongoose.model('User', UserSchema);