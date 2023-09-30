import mongoose from "mongoose";

export function establishDbConnection(): Promise<void> {
  if (!process.env.USERS_DB_CONNECTION_STRING) {
    throw new Error('"USERS_DB_CONNECTION_STRING" variable not provided');
  }


  return mongoose.connect(process.env.USERS_DB_CONNECTION_STRING).then(() => {
    console.log('Connected to the "users" DB');
  }).catch((error) => {
    console.log('Connection to "users" DB failed: ', error);
  });
}