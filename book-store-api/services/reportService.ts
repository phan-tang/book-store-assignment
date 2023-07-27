import { injectable } from 'inversify';
import { IReportService } from '../interfaces/service';
import { AuthorReport, BookReport, CategoryReport, Report } from '../models';
import { IReportCollection, IQuery, ITransformedQuery, IReportResource } from '../interfaces/model';
import QueryService from './queryService';
import { ReportModelConfig } from '../config/models';

@injectable()
class ReportService extends QueryService implements IReportService {

    constructor() {
        super();
        this.modelConfig = new ReportModelConfig();
    }

    async list(query: IQuery): Promise<IReportCollection> {
        try {
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let result = await Report.findAndCountAll({
                order: [[transformedQuery.sortBy, transformedQuery.sort.toString()]]
            });
            return {
                data: result.rows,
                total: result.count,
                page: transformedQuery.page
            };
        } catch (error) {
            throw error;
        }
    }

    async find(time: string): Promise<IReportResource> {
        try {
            let data = await Report.findOne({ where: { report_time: new Date(time) } });
            return { data };
        } catch (error) {
            throw error;
        }
    }

    async getBooks(time: string, query: IQuery): Promise<IReportCollection> {
        try {
            if (time && isNaN(Date.parse(time))) {
                return { data: null }
            }
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let result = await BookReport.findAndCountAll({ where: { report_time: new Date(time) } });
            return {
                data: result.rows,
                total: result.count,
                page: transformedQuery.page
            };
        } catch (error) {
            throw error;
        }
    }

    async getCategoryReports(time: string, query: IQuery): Promise<IReportCollection> {
        try {
            if (time && isNaN(Date.parse(time))) {
                return { data: null }
            }
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let result = await CategoryReport.findAndCountAll({ where: { report_time: new Date(time) } });
            return {
                data: result.rows,
                total: result.count,
                page: transformedQuery.page
            };
        } catch (error) {
            throw error;
        }
    }

    async getAuthorReports(time: string, query: IQuery): Promise<IReportCollection> {
        try {
            if (time && isNaN(Date.parse(time))) {
                return { data: null }
            }
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let result = await AuthorReport.findAndCountAll({ where: { report_time: new Date(time) } });
            return {
                data: result.rows,
                total: result.count,
                page: transformedQuery.page
            };
        } catch (error) {
            throw error;
        }
    }
}

export default ReportService;