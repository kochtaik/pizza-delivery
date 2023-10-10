import { BaseRMQListener } from "./base.listener";
import { createUser } from "../../controllers";
import { ChannelWrapper } from "amqp-connection-manager";

export class SignedUpListener extends BaseRMQListener {
  protected readonly exchange = 'auth.signed_up';
  protected readonly queue = 'q.user_created';

  public async listen(channel: ChannelWrapper): Promise<void> {
    await channel.assertExchange(this.exchange, 'fanout', {
      durable: false
    });

    await channel.assertQueue(this.queue, { exclusive: false, durable: true });
    await channel.bindQueue(this.queue, this.exchange, '');

    channel.consume(this.queue, async (message) => {
      console.log('new message', message);
      if (!message) return;

      await createUser();
      await channel.ack(message);
    });
  }
}

