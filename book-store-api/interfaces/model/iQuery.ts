import { mongoose } from "../../config/database";

interface ITransformedQuery {
    sort: mongoose.SortOrder;
    sortBy: string;
    perPage: number;
    page: number;
}

interface IQuery {
    [key: string]: string;
}

interface IQueryCondition {
    [key: string]: any;
}

export { ITransformedQuery, IQuery, IQueryCondition }