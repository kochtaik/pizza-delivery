import { PRODUCT_TYPES } from "../constants";

export interface IProduct {
  name: string;
  type: typeof PRODUCT_TYPES[number];
  price: number;
  weight?: number;
  description?: string;
}