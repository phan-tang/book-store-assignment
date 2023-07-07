import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IAuthController } from '../interfaces/controller';
import { loginRequest, getTokenRequest, createUserRequest } from '../requests';
import validate from '../middleware/requestValidator';

const authRouter = express.Router();

let controller = appContainer.get<IAuthController>(CONTROLLER_TYPES.IAuthController);

authRouter.route('/login')
    .post(validate(loginRequest), controller.login.bind(controller));
authRouter.route('/register')
    .post(validate(createUserRequest), controller.register.bind(controller));
authRouter.route('/token')
    .post(validate(getTokenRequest), controller.getAccessToken.bind(controller));

export default authRouter;