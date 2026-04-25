import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './configs/db.js';
import UserRouter from './routers/userRouter.js';
import PostRouter from './routers/postRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', UserRouter);
app.use('/posts', PostRouter);


connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});