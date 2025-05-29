const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth'); // JWT auth middleware

// Get current user's cart
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.productId');
  res.json(user.cart);
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.id);
  const existing = user.cart.find(item => item.productId.equals(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }
  await user.save();
  res.json(user.cart);
});

// Remove item from cart
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(item => !item.productId.equals(productId));
  await user.save();
  res.json(user.cart);
});

module.exports = router;