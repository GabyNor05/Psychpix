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
    const {
      serialNumber,
      title,
      creator,
      price,
      description,
      stock,
      year,
      discount
    } = req.body;

    let tags = req.body['tags[]'] || req.body.tags || [];
    if (typeof tags === 'string') tags = [tags];

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const item = new Item({
      serialNumber,
      title,
      creator,
      price,
      description,
      tags,
      stock,
      year,
      discount,
      imageUrl
    });

    await item.save();
    res.status(201).json({ message: 'Item saved!', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// (Optional) GET route to fetch items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;