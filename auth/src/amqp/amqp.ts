import amqp from 'amqplib';

export class MessageBroker {
  private static instance: MessageBroker;
  private exchange = 'auth-users' as const;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  private constructor() {
    this.connection = null;
    this.channel = null;
  }

  public async init(): Promise<void> {
    if (!process.env.RABBITMQ_DEFAULT_USER || !process.env.RABBITMQ_DEFAULT_PASS) {
      throw new Error('Variables RABBITMQ_DEFAULT_USER and/or RABBITMQ_DEFAULT_PASS not provided')
    }
    
    try {
      const credentials = amqp.credentials.plain(process.env.RABBITMQ_DEFAULT_USER, process.env.RABBITMQ_DEFAULT_PASS);
      this.connection = await amqp.connect('amqp://rabbitmq:5672',  { credentials });
      this.channel = await this.connection.createChannel();
      this.channel.assertExchange(this.exchange, 'fanout', { durable: false });
    } catch(error) {
      console.error('Failed to connect to RabbitMQ:', error);
      process.exit(1);
      // Promise.reject(error);
    }
  }

  public static getInstance(): MessageBroker {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new MessageBroker();
    }

    return MessageBroker.instance;
  }

  public publishMessage(message: string): boolean {
    if (!this.channel) {
      throw new Error('You need to initialize the channel before publishing messages')
    }
    return this.channel.publish(this.exchange, '', Buffer.from(message));
  }

  public async disconnect(): Promise<void> {
    if (!this.channel || !this.connection) {
      throw new Error('Channel and/or connection does not exist, nothing to close')
    }

    await this.channel.close();
    await this.connection.close();
  }
}