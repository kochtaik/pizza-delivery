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

    const credentials = amqp.credentials.plain(process.env.RABBITMQ_DEFAULT_USER, process.env.RABBITMQ_DEFAULT_PASS);

    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL, { credentials });
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      Promise.reject(error);
    }
  }

  public static getInstance(): MessageBroker {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new MessageBroker();
    }

    return MessageBroker.instance;
  }

  public async publishMessage(exchange: string, queue: string, routingKey: string, message: any): Promise<boolean> {
    if (!this.channel) {
      throw new Error('You need to initialize the channel before publishing messages');
    }

    await this.channel.assertExchange(exchange, 'direct', { durable: true });
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);
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