const mongoose = require('mongoose');
const Product = require('./Product');
const Ingredient = require('./Ingredient');

const Pizza = new mongoose.Schema({
  ...Product.schema.obj,
  ingredients: [Ingredient.schema]
})

module.exports = mongoose.model('Pizza', Pizza);