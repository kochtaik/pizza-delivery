import { BaseRMQEvent } from "./base.event";

export class SignUpEvent extends BaseRMQEvent {
  exchange = 'users';
  queue = 'users.created';
  routingKey = '';

  public async publish(message: any): Promise<boolean> {
    if (!this.channel) {
      throw new Error('You need to initialize the channel before publishing messages');
    }

    await this.channel.assertExchange(this.exchange, 'direct', { durable: true });
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);
    return this.channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(message)));
  }
}