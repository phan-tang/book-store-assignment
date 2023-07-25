import express from 'express';

import bookRouter from "./booksRouter";
import userRouter from './usersRouter';
import categoryRouter from './categoryRouter';
import authRouter from './authRouter';
import reportRouter from './reportRouter';

const routers = express.Router();

routers.use('/api/books', bookRouter);
routers.use('/api/users', userRouter);
routers.use('/api/categories', categoryRouter);
routers.use('/api/auth', authRouter);
routers.use('/api/reports', reportRouter);

export default routers;