import { Request, Response } from "express";
import Product from "../db/models/product/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  const result = await Product.find();
  res.status(200).json(result);
};

