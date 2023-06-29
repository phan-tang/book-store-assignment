import express from 'express';

import bookRouter from "./booksRouter";
import userRouter from './usersRouter';
import categoryRouter from './categoryRouter';

const routers = express.Router();

routers.use('/api/books', bookRouter);
routers.use('/api/users', userRouter);
routers.use('/api/categories', categoryRouter);

export default routers;