import express from 'express';
import "express-async-errors";
import router from "./router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', router);

/* TODO: access via process.env */

const PORT = 3002;
app.listen(PORT, () => {
  console.log('Auth microservice is listening on port ', PORT);
});
