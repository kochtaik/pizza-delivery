import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import router from './router';
import { establishDbConnection } from './db/connect';
import { ConnectionOptions, RMQConnect } from "./amqp/connect";
import { SignedUpListener } from './amqp/listeners/signed-up.listener';
import { RMQClient } from './amqp/client';
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager';
import { nextTick } from 'process';
import amqp from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', router);

const PORT = process.env.USERS_SERVICE_PORT || 3003;

async function main(): Promise<void> {

  const RMQConnectionOptions: ConnectionOptions = {
    host: process.env.RABBITMQ_HOST,
    password: process.env.RABBITMQ_DEFAULT_PASS,
    username: process.env.RABBITMQ_DEFAULT_USER,
    port: Number(process.env.RABBITMQ_PORT),
    logger: console,
  };

  try {
    await establishDbConnection();

    const rmqClient = new RMQClient(RMQConnectionOptions);
    rmqClient.connect();
    // const rmqClient = await RMQClient.connect(RMQConnectionOptions);


    const url = RMQConnect.createConnectionUrl(RMQConnectionOptions);
    const rmqConnection = await amqp.connect([url]);
    // const channel = RMQClient.channel;
    const exchange = 'auth.signed_up';
    const queue = 'q.user_created';
    const c =  rmqConnection.createChannel()

    const channel = rmqConnection.createChannel({
      json: true,
      setup: async (channel: ConfirmChannel) => {
        await channel.assertExchange(exchange, 'fanout', {
          durable: false
        });

        await channel.assertQueue(queue, { exclusive: false, durable: true });
        return channel.bindQueue(queue, exchange, '');
      }
    });

    channel.consume(queue, async (message) => {
      console.log('new message', message);
      if (!message) return;

      // await createUser();
      await channel.ack(message);
    });


    app.listen(PORT, () => {
      console.log("'Users' microservice is listening on port", PORT);
    });

    rmqConnection.on('disconnect', (error) => {
      console.log(error);
      RMQConnect.closeConnection(rmqConnection);
      process.exit(0);
    });

  } catch (error) {
    console.error(error);
  }
}

main();