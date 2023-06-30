import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { IBookService } from "../interfaces/service";
import { IBookController } from "../interfaces/controller";

@injectable()
class BookController implements IBookController {

    private service: IBookService;

    constructor(@inject(SERVICE_TYPES.IBookService) injectService: IBookService) {
        this.service = injectService;
    }

    async list(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.list(req.query);
        res.status(200).send(result);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.create(req.body);
        res.status(201).send(result);
    }

    async find(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.find(req.params['bookId']);
        if (!result.data) {
            res.status(404).json({ error: 'This book does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.update(req.params['bookId'], req.body);
        if (!result.data) {
            res.status(404).json({ error: 'This book does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.delete(req.params['bookId']);
        if (!result.data) {
            res.status(404).json({ error: 'This book does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }
}
export default BookController;