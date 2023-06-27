import { Request, Response } from 'express';

interface IBookController {
    list(req: Request, res: Response): Promise<void>;
    find(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}

export default IBookController;