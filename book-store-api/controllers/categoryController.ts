import 'reflect-metadata';
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { mongoose } from '../config/database';
import { ICategoryService } from "../interfaces/service";
import { ICategoryController } from "../interfaces/controller";

@injectable()
class CategoryController implements ICategoryController {

    private service: ICategoryService;

    constructor(@inject(SERVICE_TYPES.ICategoryService) injectService: ICategoryService) {
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
        let result = await this.service.find(new mongoose.Types.ObjectId(req.params['categoryId']));
        if (!result) {
            res.status(404).json({ error: 'This category does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }

    async update(req: Request, res: Response, next: () => void) {
        let result = await this.service.update(new mongoose.Types.ObjectId(req.params['categoryId']), req.body);
        if (!result) {
            res.status(404).json({ error: 'This category does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }

    async delete(req: Request, res: Response, next: () => void) {
        let result = await this.service.delete(new mongoose.Types.ObjectId(req.params['categoryId']));
        if (!result) {
            res.status(404).json({ error: 'This category does not exit' });
            next();
        }
        else {
            res.status(200).send({ data: result });
        }
    }
}
export default CategoryController;