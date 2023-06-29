import 'reflect-metadata';
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { mongoose } from '../config/database';
import { IUserService } from '../interfaces/service';
import { IUserController } from '../interfaces/controller';

@injectable()
class UserController implements IUserController {

    private service: IUserService;

    constructor(@inject(SERVICE_TYPES.IUserService) injectService: IUserService) {
        this.service = injectService;
    }

    async list(req: Request, res: Response, next: () => void) {
        let result = await this.service.list(req.query);
        res.status(200).send({ data: result });
    }

    async create(req: Request, res: Response, next: () => void) {
        let result = await this.service.create(req.body);
        res.status(201).send({ data: result });
    }

    async find(req: Request, res: Response, next: () => void) {
        let result = await this.service.find(new mongoose.Types.ObjectId(req.params['userId']));
        if (!result) {
            res.status(404).json({ error: 'This user does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }

    async update(req: Request, res: Response, next: () => void) {
        let result = await this.service.update(new mongoose.Types.ObjectId(req.params['userId']), req.body);
        if (!result) {
            res.status(404).json({ error: 'This user does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }

    async delete(req: Request, res: Response, next: () => void) {
        let result = await this.service.delete(new mongoose.Types.ObjectId(req.params['userId']));
        if (!result) {
            res.status(404).json({ error: 'This user does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }
}
export default UserController;