import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IAuthController } from '../interfaces/controller';
import { loginRequest, createUserRequest } from '../requests';
import zodValidate from '../middleware/zodValidator';

const authRouter = express.Router();

let controller = appContainer.get<IAuthController>(CONTROLLER_TYPES.IAuthController);

authRouter.route('/login')
    .post(zodValidate(loginRequest), controller.login.bind(controller));
authRouter.route('/register')
    .post(zodValidate(createUserRequest), controller.register.bind(controller));
authRouter.route('/refresh')
    .post(controller.getAccessToken.bind(controller));
authRouter.route('/logout')
    .delete(controller.logout.bind(controller));

export default authRouter;