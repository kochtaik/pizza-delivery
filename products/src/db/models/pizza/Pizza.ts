import { Schema, model } from "mongoose";
import { IPizza } from "./types";
import Product from "../product/Product";

const Pizza = new Schema<IPizza>({
  ...Product.schema.obj,
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient',
  }],
})

export default model<IPizza>('Pizza', Pizza);