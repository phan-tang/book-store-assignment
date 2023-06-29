import { Request, Response, NextFunction } from 'express';

interface IBaseController {
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    find(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IBaseController;