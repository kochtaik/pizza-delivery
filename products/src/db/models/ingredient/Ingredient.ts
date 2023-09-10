import { IIngredient } from "./types";
import { Schema, model} from "mongoose";

const Ingredient = new Schema<IIngredient>({
  type: {
    type: String,
    required: true,
  }
});

export default model<IIngredient>('Ingredient', Ingredient);