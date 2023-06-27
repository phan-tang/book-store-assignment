import express from 'express';

import bookRouter from "./booksRouter";

const routers = express.Router();

routers.use('/api/books', bookRouter);

export default routers;