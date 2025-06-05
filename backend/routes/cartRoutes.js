const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Product');
const { authenticateJWT  } = require('../middleware/auth'); // JWT auth middleware

// Get current user's cart
router.get('/', authenticateJWT , async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.productId');
  res.json(user.cart);
});

// Add item to cart
router.post('/add', authenticateJWT , async (req, res) => {
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
router.post('/remove', authenticateJWT , async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(item => !item.productId.equals(productId));
  await user.save();
  res.json(user.cart);
});

// Checkout and update stock
router.post('/checkout', authenticateJWT, async (req, res) => {
  const { items } = req.body;
  try {
    for (const cartItem of items) {
      // Find the item in the DB and update its stock
      const item = await Item.findById(cartItem._id);
      if (!item) continue;
      if (item.stock < cartItem.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${item.product || item.title}` });
      }
      item.stock -= cartItem.quantity;
      await item.save();
    }
    // Optionally clear user's cart after checkout
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();

    res.json({ message: "Stock updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});

module.exports = router;