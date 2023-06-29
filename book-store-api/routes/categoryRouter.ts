import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { ICategoryController } from '../interfaces/controller';
import { createCategoryRequest } from '../requests';
import validate from '../middleware/requestValidator';

const categoryRouter = express.Router();

let controller = appContainer.get<ICategoryController>(CONTROLLER_TYPES.ICategoryController);

categoryRouter.route('/')
    .get(controller.list.bind(controller))
    .post(validate(createCategoryRequest), controller.create.bind(controller));
categoryRouter.route('/:categoryId')
    .get(controller.find.bind(controller))
    .put(controller.update.bind(controller))
    .delete(controller.delete.bind(controller));

export default categoryRouter;