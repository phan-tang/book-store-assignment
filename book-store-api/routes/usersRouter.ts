import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IUserController } from '../interfaces/controller';
import { createUserRequest } from '../requests';
import validate from '../middleware/requestValidator';

import { passport } from '../middleware/passport';

const userRouter = express.Router();

let controller = appContainer.get<IUserController>(CONTROLLER_TYPES.IUserController);

userRouter.route('/')
    .get(passport.authenticate('jwt', { session: false }), controller.list.bind(controller))
    .post(passport.authenticate('jwt', { session: false }), validate(createUserRequest), controller.create.bind(controller));
userRouter.route('/:userId')
    .get(passport.authenticate('jwt', { session: false }), controller.find.bind(controller))
    .put(passport.authenticate('jwt', { session: false }), controller.update.bind(controller))
    .delete(passport.authenticate('jwt', { session: false }), controller.delete.bind(controller));

export default userRouter;