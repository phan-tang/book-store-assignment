import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { IAuthService } from '../interfaces/service';
import { IAuthController } from '../interfaces/controller';

@injectable()
class AuthController implements IAuthController {

    constructor(@inject(SERVICE_TYPES.IAuthService) private service: IAuthService) { }

    async login(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.login(req.body);
        if (!result.data) {
            res.status(401).json({ error: "Email or password is incorrect" });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.register(req.body);
        if (!result.data) {
            res.status(422).json({ error: "Email must be unique" });
            next();
        }
        else {
            res.status(201).send(result);
        }
    }

    async getAccessToken(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.getAccessToken(req.body);
        if (!result.data) {
            res.status(401).json({ error: "Invalid refresh token" });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }
}
export default AuthController;