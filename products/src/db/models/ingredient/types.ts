import { INGREDIENT_TYPES } from "../constants";

export interface IIngredient {
  type: typeof INGREDIENT_TYPES[number];
}