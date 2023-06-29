import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IBookController } from '../interfaces/controller';

const bookRouter = express.Router();

let controller = appContainer.get<IBookController>(CONTROLLER_TYPES.IBookController);

bookRouter.route('/')
    .get(controller.list.bind(controller))
    .post(controller.create.bind(controller));
bookRouter.route('/:bookId')
    .get(controller.find.bind(controller))
    .put(controller.update.bind(controller))
    .delete(controller.delete.bind(controller));

export default bookRouter;