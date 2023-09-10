const mongoose = require('mongoose');
const { INGREDIENT_TYPES } = require('./constants');

const Ingredient = new mongoose.Schema({
  type: {
    type: String,
    enum: INGREDIENT_TYPES,
    required: true,
  }
});

module.exports = mongoose.model('Ingredient', Ingredient);