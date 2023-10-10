import { ChannelWrapper } from 'amqp-connection-manager';

export abstract class BaseRMQListener {
  protected queue: string;

  public abstract listen(channel: ChannelWrapper): void;
}