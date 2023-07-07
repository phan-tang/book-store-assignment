import { Request, Response, NextFunction } from "express";

interface IAuthController {
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAccessToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IAuthController;