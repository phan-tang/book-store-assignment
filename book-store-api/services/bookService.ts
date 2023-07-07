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
        try {
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let [total, data] = await Promise.all([
                Book.countDocuments(),
                Book.find({}).
                    sort([[transformedQuery.sortBy, transformedQuery.sort]]).
                    skip((transformedQuery.page - 1) * transformedQuery.perPage).
                    limit(transformedQuery.perPage)
            ]);
            return {
                data,
                total,
                page: transformedQuery.page
            };
        } catch (error) {
            throw error;
        }
    }

    async find(id: string | number): Promise<IBookResource> {
        try {
            return { data: mongoose.isObjectIdOrHexString(id) ? await Book.findById(id) : null };
        } catch (error) {
            throw error;
        }
    }

    async create(data: IBook): Promise<IBookResource> {
        try {
            //Just admin can create new book
            data.final_price = data.price;
            return {
                data: await Book.create(data)
            };
        } catch (error) {
            throw error;
        }
    }

    async update(id: string | number, data: Partial<IBook>): Promise<IBookResource> {
        try {
            //Just admin can update book
            let book = mongoose.isObjectIdOrHexString(id) ? await Book.findById(id) : null;
            if (!book) {
                return { data: null };
            }
            Object.assign(book, data);
            return { data: await book.save() };
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string | number): Promise<IBookResource> {
        try {
            //Just admin can delete book
            let book = mongoose.isObjectIdOrHexString(id) ? await Book.findById(id) : null;
            return {
                data: !book ? null : await book.deleteOne()
            };
        } catch (error) {
            throw error;
        }
    }
}

export default BookService;