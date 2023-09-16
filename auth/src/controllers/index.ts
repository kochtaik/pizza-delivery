import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ success: true, message: "I'm login user route"});
};
