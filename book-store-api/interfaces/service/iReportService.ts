import { IReportCollection, IReportResource } from "../model";

interface IReportService {
    list(data: any): Promise<IReportCollection>;
    find(time: string): Promise<IReportResource>;
    getBooks(time: string, data: any): Promise<IReportCollection>;
    getCategoryReports(time: string, data: any): Promise<IReportCollection>;
    getAuthorReports(time: string, data: any): Promise<IReportCollection>;
}

export default IReportService;