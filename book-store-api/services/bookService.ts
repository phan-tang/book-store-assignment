import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IBookService } from '../interfaces/service';
import { IBook, IBookResource, ITransformedQuery, IQuery } from '../interfaces/model';
import { Book } from '../models';
import { BookModelConfig } from '../config/models';

import QueryService from './queryService';

@injectable()
class BookService extends QueryService implements IBookService {

    constructor() {
        super();
        this.modelConfig = new BookModelConfig();
    }

    async list(query: IQuery): Promise<IBookResource> {
        let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
        let total = await Book.countDocuments();
        let data = await Book.find({}).
            sort([[transformedQuery.sortBy, transformedQuery.sort]]).
            skip((transformedQuery.page - 1) * transformedQuery.perPage).
            limit(transformedQuery.perPage);
        return {
            data,
            total,
            page: transformedQuery.page
        };
    }

    async find(id: string | number): Promise<IBookResource> {
        return { data: mongoose.isObjectIdOrHexString(id) ? await Book.findById(id) : null };
    }

    async create(data: IBook): Promise<IBookResource> {
        //Just admin can create new book
        return {
            data: await Book.create(data)
        };
    }

    async update(id: string | number, data: Partial<IBook>): Promise<IBookResource> {
        //Just admin can update book
        let book = mongoose.isObjectIdOrHexString(id) ? await Book.findById(id) : null;
        if (!book) {
            return { data: null };
        }
        Object.assign(book, data);
        return { data: await book.save() };
    }

    async delete(id: string | number): Promise<IBookResource> {
        //Just admin can delete book
        let book = mongoose.isObjectIdOrHexString(id) ? await Book.findById(id) : null;
        return {
            data: !book ? null : await book.deleteOne()
        };
    }
}

export default BookService;