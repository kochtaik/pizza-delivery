const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers');

router.get('/', getAllProducts)

module.exports = router;