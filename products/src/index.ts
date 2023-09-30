import express from "express";
import router from './router';
import { establishDbConnection } from './db/connect';
import 'express-async-errors';

const app = express();
const PORT = process.env.PRODUCTS_SERVICE_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/products', router);

establishDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`'Products' microservice is listening on port ${PORT}`);
  });
})