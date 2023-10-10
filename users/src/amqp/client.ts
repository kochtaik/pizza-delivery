import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";
import { BaseRMQListener } from "./listeners/base.listener";

export type ConnectionOptions = {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  logger?: any;
  delayInSeconds?: number;
  maxRetries?: number;
};

export class RMQClient {
  private options: ConnectionOptions;
  private _connection: AmqpConnectionManager;
  private _listeners: Array<BaseRMQListener>;

  constructor(options: ConnectionOptions) {
    this.options = options;
  }

  public async connect(): Promise<RMQClient> {
    const url = this.createConnectionUrl(this.options);
    this._connection = await amqp.connect([url]);
    return this;
  }

  public connect(listeners: Array<BaseRMQListener>): RMQClient {
    this._listeners = listeners;
    return this;
  }

  public get connection() {
    return this._connection;
  }

  private createConnectionUrl(options: ConnectionOptions) {
    const username = options.username || "guest";
    const password = options.password || "guest";
    const host = options.host || "localhost";
    const port = options.port || 5672;

    return `amqp://${username}:${password}@${host}:${port}`;
  }

  // public static async init(connection: AmqpConnectionManager): Promise<RMQClient> {
  //   const instance = new RMQClient(connection);
  //   RMQClient._channel = connection.createChannel();
  //   return instance;
  // }

  // public static get channel() {
  //   return RMQClient._channel;
  // }

  // public setListeners(consumers: Array<BaseRMQListener>): RMQClient {
  //   this.consumers = consumers;
  //   return this;
  // }

  // public activateListeners(): RMQClient {
  //   this.consumers.forEach((listener) => {
  //     listener.listen(RMQClient._channel);
  //   });

  //   return this;
  // }
}