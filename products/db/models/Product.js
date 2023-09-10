const mongoose = require('mongoose');
const { PRODUCT_TYPES } = require('./constants');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: PRODUCT_TYPES,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be less than zero'],
  },
  weight: {
    type: Number,
    required: false,
    min: [0, 'Weight cannot be less than zero'],
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Product', ProductSchema);