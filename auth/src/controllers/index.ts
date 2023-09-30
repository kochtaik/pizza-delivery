import { Request, Response } from "express";
import { MessageBroker } from "../amqp/amqp";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ success: true, message: "I'm login user routeeeeeeeeeeeeeeeeeeeeeeeed" });
};

export const signupUser = async (req: Request, res: Response) => {
  const { message } = req.body;
  const broker = MessageBroker.getInstance();
  const result = broker.publishMessage(`${message}, id: ${Math.random()}`);

  res.status(200).json({ success: result, message: `Successfully published this message ${message}, id: ${Math.random()}` });
};