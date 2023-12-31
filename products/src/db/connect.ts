import mongoose from "mongoose";

export function establishDbConnection() {
  if (!process.env.PRODUCTS_DB_CONNECTION_STRING) {
    throw new Error('"PRODUCTS_DB_CONNECTION_STRING" variable not provided')
  }

  return mongoose.connect(process.env.PRODUCTS_DB_CONNECTION_STRING).then(() => {
    console.log('Connected to the "products" DB');
  }).catch((error: unknown) => {
    console.log('Connection to "products" DB failed: ', error);
  })
}
