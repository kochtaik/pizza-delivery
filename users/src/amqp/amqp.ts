import amqp from 'amqplib';

export class MessageBroker {
  private static instance: MessageBroker;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  private constructor() {
    this.connection = null;
    this.channel = null;
  }

  public async init(): Promise<void> {
    if (!process.env.RABBITMQ_DEFAULT_USER || !process.env.RABBITMQ_DEFAULT_PASS || !process.env.RABBITMQ_URL) {
      throw new Error('Variables RABBITMQ_DEFAULT_USER and/or RABBITMQ_DEFAULT_PASS not provided');
    }
    try {
      const credentials = amqp.credentials.plain(process.env.RABBITMQ_DEFAULT_USER, process.env.RABBITMQ_DEFAULT_PASS);
      this.connection = await amqp.connect(process.env.RABBITMQ_URL, { credentials });
      this.channel = await this.connection.createChannel();

      const queue = "auth.create_user";
      await this.channel.assertQueue(queue, { durable: true });
      this.consume(queue);

    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      Promise.reject(error);
    }
  }

  private async consume(queue: string) {
    
    
    await this.channel!.consume(queue, async (msg) => {
      if (!msg) return;

      console.log('[Users]: Got a new message', msg.content.toString());
      await this.channel!.ack(msg);
    }, {
      noAck: false,
      consumerTag: 'signup_consumer',
    });

  }

  public static getInstance(): MessageBroker {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new MessageBroker();
    }

    return MessageBroker.instance;
  }

  public publishMessage(exchange: string, routingKey: string, message: any): boolean {
    if (!this.channel) {
      throw new Error('You need to initialize the channel before publishing messages');
    }

    return this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
  }

  public async disconnect(): Promise<void> {
    if (!this.channel || !this.connection) {
      throw new Error('Channel and/or connection does not exist, nothing to close');
    }

    await this.channel.close();
    await this.connection.close();
  }
}