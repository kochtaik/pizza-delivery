const express = require('express');
require('express-async-errors');
const router = require('./router')
const { establishDbConnection } = require('./db/connect');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

establishDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`'Products' microservice is listening on port ${PORT}`);
  });
})