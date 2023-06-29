import { injectable } from "inversify";
import { ITransformedQuery, IQuery } from "../interfaces/model";

@injectable()
class BaseService {
    getTransformedQuery(query: IQuery): ITransformedQuery {
        let transformedQuery: ITransformedQuery = {
            perPage: query['per-page'] ? parseInt(query['per-page']) : 1,
            page: query['page'] ? parseInt(query['page']) : 1,
            sortBy: query['sort-by'] ? query['sort-by'] : 'name',
            sort: query['sort'] && query['sort'] === 'desc' ? query['sort'] : 'asc',
        };
        return transformedQuery;
    }
}

export default BaseService;