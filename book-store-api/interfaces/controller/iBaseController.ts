import { Request, Response } from 'express';

interface IBaseController {
    list(req: Request, res: Response, next: () => void): Promise<void>;
    find(req: Request, res: Response, next: () => void): Promise<void>;
    create(req: Request, res: Response, next: () => void): Promise<void>;
    update(req: Request, res: Response, next: () => void): Promise<void>;
    delete(req: Request, res: Response, next: () => void): Promise<void>;
}

export default IBaseController;