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

export { ITransformedQuery, IQuery }