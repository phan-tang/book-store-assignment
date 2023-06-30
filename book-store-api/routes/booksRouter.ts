import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IBookController } from '../interfaces/controller';
import { createBookRequest } from '../requests';
import validate from '../middleware/requestValidator';

const bookRouter = express.Router();

let controller = appContainer.get<IBookController>(CONTROLLER_TYPES.IBookController);

/**
* @swagger
* /books/:
*   get:
*     summary: Get a books in books collection.
*     tags: [Books]
*     responses:
*       200:
*         description: Get books successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   items:  
*                       type: object
*                       properties:
*                           id:
*                               type: string
*                               description: The book ID.
*                               example: 649e51bbbb0d332f7ea707e3
*                           name:
*                               type: string
*                               description: The book's name.
*                               example: Sports
*                           author_name:
*                               type: string
*                               description: The book's author name.
*                               example: PT
*                           category_name:
*                               type: string
*                               description: The book's category name.
*                               example: Sport
*                           summary:
*                               type: string
*                               description: The book's summary.
*                               example: PT
*                           price:
*                               type: float
*                               description: The book's price.
*                               example: 10
*                           final_price:
*                               type: float
*                               description: The book's final price.
*                               example: 10
*                           image:
*                               type: string
*                               description: The book's image link.
*                               example: './default.jpg'
*                           quantity:
*                               type: integer
*                               description: The book's quantity.
*                               example: 10
*                 total:
*                   type: integer
*                   description: Total of books in collection
*                   example: 10
*                 page:
*                   type: integer
*                   description: Current page
*                   example: 1
*/
bookRouter.get('/', controller.list.bind(controller));

/**
* @swagger
* /books/:
*   post:
*     summary: Create a new book.
*     tags: [Books]
*     requestBody:
*         required: true
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       name:
*                           type: string
*                           description: The book's name.
*                           example: Sport
*                       author_name:
*                           type: string
*                           description: The book's author name.
*                           example: PT
*                       category_name:
*                           type: string
*                           description: The book's category name.
*                           example: Sport
*                       summary:
*                           type: string
*                           description: The book's summary.
*                           example: PT
*                       price:
*                           type: float
*                           description: The book's price.
*                           example: 10
*                       image:
*                           type: string
*                           description: The book's image link.
*                           example: './default.jpg'
*                       quantity:
*                           type: number
*                           description: The book's quantity.
*                           example: 10
*     responses:
*       201:
*         description: Create a new book successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: string
*                       description: The book ID.
*                       example: 649e51bbbb0d332f7ea707e3
*                     name:
*                       type: string
*                       description: The book's name.
*                       example: Sports
*                     author_name:
*                       type: string
*                       description: The book's author name.
*                       example: PT
*                     category_name:
*                       type: string
*                       description: The book's category name.
*                       example: Sport
*                     summary:
*                       type: string
*                       description: The book's summary.
*                       example: PT
*                     price:
*                       type: float
*                       description: The book's price.
*                       example: 10
*                     final_price:
*                       type: float
*                       description: The book's final price.
*                       example: 10
*                     image:
*                       type: string
*                       description: The book's image link.
*                       example: './default.jpg'
*                     quantity:
*                       type: integer
*                       description: The book's quantity.
*                       example: 10
*/
bookRouter.post('/', validate(createBookRequest), controller.create.bind(controller));

/**
* @swagger
* /books/{bookId}:
*   get:
*     summary: Get a book in books collection.
*     tags: [Books]
*     parameters:
*       - in: path
*         name: bookId
*         required: true
*         description: MongoDB ID of the book to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Get a book successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: string
*                       description: The book ID.
*                       example: 649e51bbbb0d332f7ea707e3
*                     name:
*                       type: string
*                       description: The book's name.
*                       example: Sports
*                     author_name:
*                       type: string
*                       description: The book's author name.
*                       example: PT
*                     category_name:
*                       type: string
*                       description: The book's category name.
*                       example: Sport
*                     summary:
*                       type: string
*                       description: The book's summary.
*                       example: PT
*                     price:
*                       type: float
*                       description: The book's price.
*                       example: 10
*                     final_price:
*                       type: float
*                       description: The book's final price.
*                       example: 10
*                     image:
*                       type: string
*                       description: The book's image link.
*                       example: './default.jpg'
*                     quantity:
*                       type: integer
*                       description: The book's quantity.
*                       example: 10
*/
bookRouter.get('/:bookId', controller.find.bind(controller));

/**
* @swagger
* /books/{bookId}:
*   put:
*     summary: Update a book in books collection.
*     tags: [Books]
*     parameters:
*       - in: path
*         name: bookId
*         required: true
*         description: MongoDB ID of the book to retrieve.
*         schema:
*           type: string
*     requestBody:
*         required: true
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       name:
*                           type: string
*                           description: The book's name.
*                           example: Sport
*                       author_name:
*                           type: string
*                           description: The book's author name.
*                           example: PT
*                       category_name:
*                           type: string
*                           description: The book's category name.
*                           example: Sport
*                       summary:
*                           type: string
*                           description: The book's summary.
*                           example: PT
*                       price:
*                           type: float
*                           description: The book's price.
*                           example: 10
*                       image:
*                           type: string
*                           description: The book's image link.
*                           example: './default.jpg'
*                       quantity:
*                           type: number
*                           description: The book's quantity.
*                           example: 10
*     responses:
*       200:
*         description: Update a book successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: string
*                       description: The book ID.
*                       example: 649e51bbbb0d332f7ea707e3
*                     name:
*                       type: string
*                       description: The book's name.
*                       example: Sports
*                     author_name:
*                       type: string
*                       description: The book's author name.
*                       example: PT
*                     category_name:
*                       type: string
*                       description: The book's category name.
*                       example: Sport
*                     summary:
*                       type: string
*                       description: The book's summary.
*                       example: PT
*                     price:
*                       type: float
*                       description: The book's price.
*                       example: 10
*                     final_price:
*                       type: float
*                       description: The book's final price.
*                       example: 10
*                     image:
*                       type: string
*                       description: The book's image link.
*                       example: './default.jpg'
*                     quantity:
*                       type: integer
*                       description: The book's quantity.
*                       example: 10
*/
bookRouter.put('/:bookId', controller.update.bind(controller));

/**
* @swagger
* /books/{bookId}:
*   delete:
*     summary: Delete a book in books collection.
*     tags: [Books]
*     parameters:
*       - in: path
*         name: bookId
*         required: true
*         description: MongoDB ID of the book to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Delete a book successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: string
*                       description: The book ID.
*                       example: 649e51bbbb0d332f7ea707e3
*                     name:
*                       type: string
*                       description: The book's name.
*                       example: Sports
*                     author_name:
*                       type: string
*                       description: The book's author name.
*                       example: PT
*                     category_name:
*                       type: string
*                       description: The book's category name.
*                       example: Sport
*                     summary:
*                       type: string
*                       description: The book's summary.
*                       example: PT
*                     price:
*                       type: float
*                       description: The book's price.
*                       example: 10
*                     final_price:
*                       type: float
*                       description: The book's final price.
*                       example: 10
*                     image:
*                       type: string
*                       description: The book's image link.
*                       example: './default.jpg'
*                     quantity:
*                       type: integer
*                       description: The book's quantity.
*                       example: 10
*/
bookRouter.delete('/:bookId', controller.delete.bind(controller));

export default bookRouter;