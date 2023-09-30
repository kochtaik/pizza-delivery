import express from 'express';
import "express-async-errors";
import router from "./router";
import { MessageBroker } from './amqp/amqp';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', router);

const messageBroker = MessageBroker.getInstance();

const PORT = process.env.AUTH_SERVICE_PORT || 3002;

messageBroker.init().then(() => {
  app.listen(PORT, () => {
    console.log('Auth microservice is listening on port', PORT);
  });
});


