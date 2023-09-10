const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function establishDbConnection() {
  return mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log('Connected to the "products" DB');
  }).catch((error) => {
    console.log('Connection to "products" DB failed: ', error);
  })
}

module.exports = { establishDbConnection };