import express from 'express';
import 'express-async-errors';
import router from './router';
import { establishDbConnection } from './db/connect';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', router);

establishDbConnection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("'Users' microservice is listening on port", process.env.PORT);
  });
});