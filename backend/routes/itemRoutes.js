const express = require('express');
const router = express.Router();
const Item = require('../models/Product'); // Create this model as shown earlier
const multer = require('multer');
const upload = multer(); // for memory storage; configure as needed
const { authenticateJWT  } = require('../middleware/auth'); // JWT auth middleware

// POST route to handle form data and file upload
router.post('/', async (req, res) => {
  console.log('BODY:', req.body);
  try {
    // Always ensure tags is an array
    let tags = req.body['tags[]'] || req.body.tags || [];
    if (typeof tags === 'string') tags = [tags];

    const item = new Item({
      serialNumber: req.body.serialNumber,
      title: req.body.title,
      creator: req.body.creator,
      price: Number(req.body.price),
      description: req.body.description,
      tags: tags,
      stock: Number(req.body.stock),
      year: Number(req.body.year),
      rating: 0,
      ratingAmount: 0,
      discount: req.body.discount ? Number(req.body.discount) : undefined,
      imageUrl: req.body.imageUrl,
    });

    await item.save();
    res.status(201).json({ message: 'Item saved!', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find(); // Gets all items
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// (Optional) GET route to fetch items
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE route to delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/comments', async (req, res) => {
  try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }
      
      const newCommentId = req.body.commentId;
      const newRating = Number(req.body.rating);
      const currentTotal = item.rating * item.ratingAmount;
      const newRatingAmount = item.ratingAmount + 1;
      const updatedAverage = (currentTotal + newRating) / newRatingAmount;

      if (!newCommentId || !newRating) {
        return res.status(400).json({ message: 'Missing parameters in body' });
      }

      item.commentsId.push(newCommentId);
      item.rating = updatedAverage;
      item.ratingAmount = newRatingAmount;
      await item.save();
      res.status(201).json({ message: 'Comment added on item!', item });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id/rating', async (req, res) => {
  try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }

      const newRating = (item.rating + req.body.rating) / ratingAmount + 1;

      item.rating = newRating;
      item.ratingAmount += 1;
      await item.save();
      res.status(201).json({ message: 'Comment added on item!', item });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id/commentsId', async (req, res) => {
  try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        console.log('Item not found');
        return res.status(404).json({ message: 'Item not found' });
      }

      const commentIdToRemove = req.body.commentId;
      if (!commentIdToRemove) {
        return res.status(400).json({ message: 'Missing commentId in body' });
      }

      const index = item.commentsId.indexOf(commentIdToRemove);
      if (index > -1) {
        item.commentsId.splice(index, 1);
        await item.save();
        res.status(200).json({ message: 'Comment removed from item!', item });
    } else {
      res.status(404).json({ message: 'CommentId not found in item' });
    }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update an item by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  console.log(req.body);
  try {
    let tags = req.body['tags[]'] || req.body.tags || [];
    if (typeof tags === 'string') tags = [tags];

    const update = {
      serialNumber: req.body.serialNumber,
      title: req.body.title,
      creator: req.body.creator,
      price: Number(req.body.price),
      description: req.body.description,
      tags: tags,
      stock: Number(req.body.stock),
      year: Number(req.body.year),
      discount: req.body.discount ? Number(req.body.discount) : undefined,
    };
    // if (req.file) {
    //   update.imageUrl = `/uploads/${req.file.filename}`;
    // }

    const item = await Item.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Decrement stock
router.post('/items/decrement-stock', authenticateJWT, async (req, res) => {
  const { itemId, quantity } = req.body;
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });
  if (item.stock < quantity) return res.status(400).json({ message: "Not enough stock" });
  item.stock -= quantity;
  await item.save();
  res.json({ message: "Stock decremented" });
});

// Increment stock
router.post('/items/increment-stock', authenticateJWT, async (req, res) => {
  const { itemId, quantity } = req.body;
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.stock += quantity;
  await item.save();
  res.json({ message: "Stock incremented" });
});

module.exports = router;