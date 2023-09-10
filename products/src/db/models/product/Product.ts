import { Schema, model } from 'mongoose';
import { IProduct } from './types';

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be less than zero'],
  },
  weight: {
    type: Number,
    required: false,
    min: [0, 'Weight cannot be less than zero'],
  },
  description: {
    type: String,
    required: false,
  },
});


export default model<IProduct>('Product', ProductSchema);

