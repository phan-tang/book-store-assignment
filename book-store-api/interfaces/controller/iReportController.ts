import { Request, Response, NextFunction } from "express";

interface IReportController {
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    find(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAuthorReports(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCategoryReports(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IReportController;