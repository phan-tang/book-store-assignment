import express from 'express';
import appContainer from '../inversify.config';
import { CONTROLLER_TYPES } from '../config/types';
import { IReportController } from '../interfaces/controller';

import { passport } from '../middleware/passport';

const reportRouter = express.Router();

let controller = appContainer.get<IReportController>(CONTROLLER_TYPES.IReportController);

reportRouter.route('/')
    .get(passport.authenticate('jwt', { session: false }), controller.list.bind(controller));
reportRouter.route('/:reportId')
    .get(passport.authenticate('jwt', { session: false }), controller.find.bind(controller));
reportRouter.route('/books/:reportId')
    .get(passport.authenticate('jwt', { session: false }), controller.getBooks.bind(controller));
reportRouter.route('/authors/:reportId')
    .get(passport.authenticate('jwt', { session: false }), controller.getAuthorReports.bind(controller));
reportRouter.route('/categories/:reportId')
    .get(passport.authenticate('jwt', { session: false }), controller.getCategoryReports.bind(controller));

export default reportRouter;