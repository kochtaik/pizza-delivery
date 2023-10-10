import { Request, Response } from "express";
import { SignUpEvent } from "../amqp/events/signed-up.event";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ success: true, message: "I'm login user routeeeeeeeeeeeeeeeeeeeeeeeed" });
};

export const signupUser = async (req: Request, res: Response) => {
  const { message } = req.body;
  const id = Math.random();

  const event = new SignUpEvent();
  const result = await event.publish({ id, message });

  res.status(200).json({ success: result, message: `Successfully published this message ${message}, id: ${id}` });
};