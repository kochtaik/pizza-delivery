import { Request, Response } from "express";

export const findUser = async (req: Request, res: Response) => {
  res.status(200).json({ result: 'success' });
};

export const createUser = async () => {
  console.log('create user controller')
}