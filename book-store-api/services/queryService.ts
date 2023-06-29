import { injectable } from "inversify";
import { ITransformedQuery, IQuery } from "../interfaces/model";
import { BaseModelConfig } from "../config/models";

@injectable()
class QueryService {

    protected modelConfig: BaseModelConfig;

    constructor() {
        this.modelConfig = new BaseModelConfig();
    }

    protected getTransformedQuery(query: IQuery): ITransformedQuery {
        let transformedQuery: ITransformedQuery = {
            perPage: this.getPerPage(query['per-page']),
            page: this.getPage(query['page']),
            sortBy: this.getSortField(query['sort-by']),
            sort: query['sort'] && query['sort'] === 'desc' ? 'desc' : 'asc',
        };
        return transformedQuery;
    }

    private getSortField(queryField: string | undefined): string {
        return queryField && this.modelConfig.getSortFields().includes(queryField) ?
            queryField : this.modelConfig.getDefaultSortField()
    }

    private getPerPage(queryPerPage: string | undefined) {
        return queryPerPage && Number.isInteger(queryPerPage) ?
            parseInt(queryPerPage) : this.modelConfig.getPerPage();
    }

    private getPage(queryPage: string | undefined) {
        return queryPage && Number.isInteger(queryPage) ?
            parseInt(queryPage) : this.modelConfig.getPage();
    }
}

export default QueryService;