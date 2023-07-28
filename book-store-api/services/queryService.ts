import { injectable } from "inversify";
import { ITransformedQuery, IQuery } from "../interfaces/model";
import { BaseModelConfig } from "../config/models";
import BaseService from "./baseService";
import isBoolean from "validator/lib/isBoolean";

@injectable()
class QueryService extends BaseService {

    protected modelConfig: BaseModelConfig;

    constructor() {
        super();
        this.modelConfig = new BaseModelConfig();
    }

    protected getTransformedQuery(query: IQuery): ITransformedQuery {
        query = Object.keys(query).filter(key => !['', 'all'].includes(query[key]))
            .reduce((obj, key) => ({ ...obj, [key.replace('-', '_')]: query[key] }), {});
        return {
            perPage: this.getPerPage(query['per-page']),
            page: this.getPage(query['page']),
            sortBy: this.getSortField(query['sort-by']),
            sort: query['sort'] && query['sort'] === 'desc' ? 'desc' : 'asc',
            filter: this.getFilterFields(query)
        };
    }

    private getSortField(queryField: string | undefined): string {
        return queryField && this.modelConfig.getSortFields().includes(queryField) ?
            queryField : this.modelConfig.getDefaultSortField()
    }

    private getPerPage(queryPerPage: string | undefined) {
        return queryPerPage && Number.isInteger(parseInt(queryPerPage)) ?
            parseInt(queryPerPage) : this.modelConfig.getPerPage();
    }

    private getPage(queryPage: string | undefined) {
        return queryPage && Number.isInteger(parseInt(queryPage)) ?
            parseInt(queryPage) : this.modelConfig.getPage();
    }

    private getFilterFields(query: IQuery) {
        return Object.keys(query).filter(field => this.modelConfig.getFilterField(field))
            .reduce((obj, key) => ({ ...obj, [key]: this.getFilterValue(key, query[key]) }), {});
    }

    private getFilterValue(key: string, value: string) {
        let filterField = this.modelConfig.getFilterField(key);
        if (filterField?.type === 'boolean') { return isBoolean(value) ? value : null }
        if (filterField?.type === 'number') { return parseFloat(value) }
        return { $regex: new RegExp("^" + value.toLowerCase(), "i") };
    }
}

export default QueryService;