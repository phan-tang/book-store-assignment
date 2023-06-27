import 'reflect-metadata';
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { mongoose } from '../config/database';
import { IBookService } from "../interfaces/service";
import { IBookController } from "../interfaces/controller";

@injectable()
class BookControlller implements IBookController {

    private service: IBookService;

    constructor(@inject(TYPES.IBookService) injectService: IBookService) {
        this.service = injectService;
    }

    async list(req: Request, res: Response) {
        let result = await this.service.list();
        res.send(result);
    }

    async create(req: Request, res: Response) {
        let result = await this.service.create(req.body);
        res.send(result);
    }

    async find(req: Request, res: Response) {
        let result = await this.service.find(req.body);
        res.send(result);
    }

    async update(req: Request, res: Response) {
        let result = await this.service.update(new mongoose.Types.ObjectId(req.params['bookId']), req.body);
        res.send(result);
    }

    async delete(req: Request, res: Response) {
        let result = await this.service.delete(new mongoose.Types.ObjectId(req.params['bookId']));
        res.send(result);
    }
}
export default BookControlller;