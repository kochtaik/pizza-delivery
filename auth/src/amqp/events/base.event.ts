import { RMQClient } from "../client";

export abstract class BaseRMQEvent {
  protected abstract exchange: string;
  protected abstract queue?: string;
  protected abstract routingKey?: string;
  protected channel = RMQClient.channel;

  public abstract publish(message: any): Promise<boolean>;
}
