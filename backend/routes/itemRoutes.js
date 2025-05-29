const express = require('express');
const router = express.Router();
const Item = require('../models/Product'); // Create this model as shown earlier
const multer = require('multer');
const upload = multer(); // for memory storage; configure as needed


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

// PUT route to update an item by ID
router.put('/:id', upload.single('image'), async (req, res) => {
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
    if (req.file) {
      update.imageUrl = `/uploads/${req.file.filename}`;
    }

    const item = await Item.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;