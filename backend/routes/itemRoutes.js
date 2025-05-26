const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Product'); // Create this model as shown earlier

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });



// POST route to handle form data and file upload
router.post('/', upload.single('image'), async (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
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
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
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

module.exports = router;