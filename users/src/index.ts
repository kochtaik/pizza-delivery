import express from 'express';
import 'express-async-errors';
import router from './router';
import { establishDbConnection } from './db/connect';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', router);

const PORT = process.env.USERS_SERVICE_PORT || 3003;

establishDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log("'Users' microservice is listening on port", PORT);
  });
});