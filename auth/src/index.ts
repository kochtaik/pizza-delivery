import express from 'express';
import "express-async-errors";
import router from "./router";
import dotenv from 'dotenv';
import { ConnectionOptions, RMQConnect } from './amqp/connect';
import { RMQClient } from './amqp/client';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', router);

const PORT = process.env.AUTH_SERVICE_PORT || 3002;

async function main(): Promise<void> {
  const RMQConnectionOptions: ConnectionOptions = {
    host: process.env.RABBITMQ_HOST,
    password: process.env.RABBITMQ_DEFAULT_PASS,
    username: process.env.RABBITMQ_DEFAULT_USER,
    port: Number(process.env.RABBITMQ_PORT),
    logger: console,
  };

  const rmqConnection = await RMQConnect.connectUntil(RMQConnectionOptions);
  const rmqClient = await RMQClient.init(rmqConnection);

  app.listen(PORT, () => {
    console.log('Auth microservice is listening on port', PORT);
  });

  rmqConnection.on('disconnect', async (error) => {
    RMQConnect.closeConnection(rmqConnection);
    process.exit(0);
  });
}

main();
