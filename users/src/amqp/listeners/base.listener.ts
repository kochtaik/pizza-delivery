import { ChannelWrapper } from 'amqp-connection-manager';

export abstract class BaseRMQListener {
  protected abstract queue: string;
  protected abstract exchange: string;

  public abstract listen(channel: ChannelWrapper): Promise<void>;
}