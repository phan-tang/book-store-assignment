import express from 'express';
import appContainer from '../inversify.config';
import { TYPES } from '../config/types';
import { IBookController } from '../interfaces/controller';

const router = express.Router();

let controller = appContainer.get<IBookController>(TYPES.IBookController);

router.get('/', controller.list.bind(controller));
router.post('/', controller.create.bind(controller));
router.get('/:bookId', controller.find.bind(controller));
router.put('/:bookId', controller.update.bind(controller));
router.delete('/:bookId', controller.delete.bind(controller));

export default router;