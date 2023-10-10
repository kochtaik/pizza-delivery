import { BaseRMQEvent } from "./base.event";

export class SignUpEvent extends BaseRMQEvent {
  protected readonly exchange = 'auth.signed_up';
  protected queue?: string;
  protected routingKey?: string;

  public async publish(message: any): Promise<boolean> {
    if (!this.channel) {
      throw new Error('You need to initialize the channel before publishing messages');
    }


    // const queue = 'q.user_created';
    // await this.channel.assertQueue(queue, { exclusive: false, durable: true });
    // await this.channel.bindQueue(queue, this.exchange, '');


    await this.channel.assertExchange(this.exchange, 'fanout', { durable: false });
    const res = await this.channel.publish(this.exchange, '', Buffer.from(JSON.stringify(message)));
    console.log('Message published to the exchange', this.exchange)
    return res;
  }
}