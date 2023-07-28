import { Request, Response, NextFunction } from 'express';

import IBaseController from './iBaseController';

interface ICategoryController extends IBaseController {
    listAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default ICategoryController;