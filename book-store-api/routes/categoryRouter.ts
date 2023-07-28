import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { ICategoryController } from '../interfaces/controller';
import { createCategoryRequest } from '../requests';
import zodValidate from '../middleware/zodValidator';
import { passport } from '../middleware/passport';

const categoryRouter = express.Router();

let controller = appContainer.get<ICategoryController>(CONTROLLER_TYPES.ICategoryController);

categoryRouter.route('/')
    .get(controller.list.bind(controller))
    .post(passport.authenticate('jwt', { session: false }), zodValidate(createCategoryRequest), controller.create.bind(controller));
categoryRouter.route('/all')
    .get(controller.listAll.bind(controller))
categoryRouter.route('/:categoryId')
    .get(controller.find.bind(controller))
    .put(passport.authenticate('jwt', { session: false }), controller.update.bind(controller))
    .delete(passport.authenticate('jwt', { session: false }), controller.delete.bind(controller));

export default categoryRouter;