import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import router from './router';
import { establishDbConnection } from './db/connect';
import { MessageBroker } from './amqp/amqp';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', router);

const PORT = process.env.USERS_SERVICE_PORT || 3003;


const messageBroker = MessageBroker.getInstance();
establishDbConnection()
  .then(() => messageBroker.init())
  .then(() => {
    app.listen(PORT, () => {
      console.log("'Users' microservice is listening on port", PORT);
    });
  });