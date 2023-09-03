const express = require('express');
const router = require('./router')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.log(`'Products' microservice is listening on port ${PORT}`);
});