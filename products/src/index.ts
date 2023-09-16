import express from "express";
import router from './router';
import { establishDbConnection } from './db/connect';
import 'express-async-errors';

const app = express();
/* TODO: access via process.env */
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/products', router);

establishDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`'Products' microservice is listening on port ${PORT}`);
  });
})