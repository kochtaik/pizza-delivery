import { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";
import { BaseRMQListener } from "./listeners/base.listener";

export class RMQClient {
  private static _channel: ChannelWrapper;
  private connection: AmqpConnectionManager;
  private consumers: Array<BaseRMQListener>;

  private constructor(connection: AmqpConnectionManager) {
    this.connection = connection;
  }

  public static init(connection: AmqpConnectionManager): RMQClient {
    const instance = new RMQClient(connection);
    RMQClient._channel = connection.createChannel();
    return instance;
  }

  public static get channel() {
    return RMQClient._channel;
  }

  public setListeners(consumers: Array<BaseRMQListener>): RMQClient {
    this.consumers = consumers;
    return this;
  }

  public activateListeners(): RMQClient {
    this.consumers.forEach((listener) => {
      listener.listen(RMQClient.channel);
    });

    return this;
  }
}