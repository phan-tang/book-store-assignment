import { mongoose } from "../../config/database";

export interface ITransformedQuery {
    sort: mongoose.SortOrder;
    sortBy: string;
    perPage: number;
    page: number;
}

export interface IQuery {
    [key: string]: string;
}