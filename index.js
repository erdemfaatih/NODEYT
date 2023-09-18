import express from 'express';
import postgresClient from './config/db.js';
import userRouter from './routers/userRouter.js';

const app = express();
app.use(express.json());

app.use('/tasks', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
  postgresClient.connect(err => {
    if (err) {
      console.log('Connection error', err.stack);
    } else {
      console.log('DB connection successful');
    }
  });
});
