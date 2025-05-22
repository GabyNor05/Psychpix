const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  serialNumber: String,
  title: String,
  creator: String,
  price: Number,
  description: String,
  tags: [String],
  stock: Number,
  year: Number,
  discount: Number,
  imageUrl: String // Store the image file path or URL
});

module.exports = mongoose.model('Item', ItemSchema);