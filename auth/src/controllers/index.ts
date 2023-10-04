import { Request, Response } from "express";
import { MessageBroker } from "../amqp/amqp";
import { EXCHANGES, QUEUES } from "../amqp/constants";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ success: true, message: "I'm login user routeeeeeeeeeeeeeeeeeeeeeeeed" });
};

export const signupUser = async (req: Request, res: Response) => {
  const { message } = req.body;
  const broker = MessageBroker.getInstance();
  const id = Math.random();

  const result = await broker.publishMessage(
    EXCHANGES.SIGNED_UP,
    QUEUES.CREATE_USER,
    'signed_up',
    { id, message }
  );

  res.status(200).json({ success: result, message: `Successfully published this message ${message}, id: ${id}` });
};