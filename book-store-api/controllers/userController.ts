import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { IUserService } from '../interfaces/service';
import { IUserController } from '../interfaces/controller';

@injectable()
class UserController implements IUserController {

    constructor(@inject(SERVICE_TYPES.IUserService) private service: IUserService) { }

    async list(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.list(req.query);
        res.status(200).send(result);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.create(req.body);
        if (!result.data) {
            res.status(422).json({ error: "Email must be unique" });
            next();
        }
        else {
            res.status(201).send(result);
        }
    }

    async find(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.find(req.params['userId']);
        if (!result.data) {
            res.status(404).json({ error: 'This user does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.update(req.params['userId'], req.body);
        if (!result.data) {
            res.status(404).json({ error: 'This user does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.delete(req.params['userId']);
        if (!result.data) {
            res.status(404).json({ error: 'This user does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }
}
export default UserController;