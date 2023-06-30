import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { ICategoryService } from "../interfaces/service";
import { ICategoryController } from "../interfaces/controller";

@injectable()
class CategoryController implements ICategoryController {

    private service: ICategoryService;

    constructor(@inject(SERVICE_TYPES.ICategoryService) injectService: ICategoryService) {
        this.service = injectService;
    }

    async list(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.list(req.query);
        res.send(result);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.create(req.body);
        if (!result.data) {
            res.status(422).json({ error: "Name must be unique" });
            next();
        }
        else {
            res.status(201).send(result);
        }
    }

    async find(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.find(req.params['categoryId']);
        if (!result.data) {
            res.status(404).json({ error: 'This category does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.update(req.params['categoryId'], req.body);
        if (!result.data) {
            res.status(400).json({ error: 'Cannot update category' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.delete(req.params['categoryId']);
        if (!result.data) {
            res.status(404).json({ error: 'This category does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }
}
export default CategoryController;