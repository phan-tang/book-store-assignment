import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { SERVICE_TYPES } from "../config/types";
import { IReportService } from '../interfaces/service';
import { IReportController } from '../interfaces/controller';

@injectable()
class ReportController implements IReportController {

    constructor(@inject(SERVICE_TYPES.IReportService) private service: IReportService) { }

    async list(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.list(req.query);
        res.status(200).send(result);
    }

    async find(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.find(req.params['reportId']);
        if (!result.data) {
            res.status(404).json({ error: 'This report does not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.getBooks(req.params['reportId'], req.query);
        if (!result.data) {
            res.status(404).json({ error: 'These records do not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async getAuthorReports(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.getAuthorReports(req.params['reportId'], req.query);
        if (!result.data) {
            res.status(404).json({ error: 'These records do not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }

    async getCategoryReports(req: Request, res: Response, next: NextFunction) {
        let result = await this.service.getCategoryReports(req.params['reportId'], req.query);
        if (!result.data) {
            res.status(404).json({ error: 'These records do not exit' });
            next();
        }
        else {
            res.status(200).send(result);
        }
    }
}
export default ReportController;