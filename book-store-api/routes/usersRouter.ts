import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IUserController } from '../interfaces/controller';

const userRouter = express.Router();

let controller = appContainer.get<IUserController>(CONTROLLER_TYPES.IUserController);

userRouter.route('/')
    .get(controller.list.bind(controller))
    .post(controller.create.bind(controller));
userRouter.route('/:userId')
    .get(controller.find.bind(controller))
    .put(controller.update.bind(controller))
    .delete(controller.delete.bind(controller));

export default userRouter;