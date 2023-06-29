import 'reflect-metadata';
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { mongoose } from '../config/database';
import { IBookService } from "../interfaces/service";
import { IBookController } from "../interfaces/controller";

@injectable()
class BookController implements IBookController {

    private service: IBookService;

    constructor(@inject(SERVICE_TYPES.IBookService) injectService: IBookService) {
        this.service = injectService;
    }

    async list(req: Request, res: Response, next: () => void) {
        let result = await this.service.list(req.query);
        res.send(result);
    }

    async create(req: Request, res: Response, next: () => void) {
        let result = await this.service.create(req.body);
        res.send(result);
    }

    async find(req: Request, res: Response, next: () => void) {
        let result = await this.service.find(new mongoose.Types.ObjectId(req.params['bookId']));
        if (!result) {
            res.status(404).json({ error: 'This book does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }

    async update(req: Request, res: Response, next: () => void) {
        let result = await this.service.update(new mongoose.Types.ObjectId(req.params['bookId']), req.body);
        if (!result) {
            res.status(404).json({ error: 'This book does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }

    async delete(req: Request, res: Response, next: () => void) {
        let result = await this.service.delete(new mongoose.Types.ObjectId(req.params['bookId']));
        if (!result) {
            res.status(404).json({ error: 'This book does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }
}
export default BookController;