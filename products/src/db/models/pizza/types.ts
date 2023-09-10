import { Types } from "mongoose";
import { IProduct } from "../product/types";

export interface IPizza extends IProduct {
  ingredients: Types.ObjectId;
}