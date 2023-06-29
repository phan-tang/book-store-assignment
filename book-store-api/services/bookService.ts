import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IBookService } from '../interfaces/service';
import { IBook, ITransformedQuery, IQuery } from '../interfaces/model';
import { Book } from '../models';
import { BookModelConfig } from '../config/models';

import QueryService from './queryService';

@injectable()
class BookService extends QueryService implements IBookService {

    constructor() {
        super();
        this.modelConfig = new BookModelConfig();
    }

    async list(query: IQuery): Promise<IBook[]> {
        let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
        return await Book.find({}).
            sort([[transformedQuery.sortBy, transformedQuery.sort]]).
            skip((transformedQuery.page - 1) * transformedQuery.perPage).
            limit(transformedQuery.perPage);
    }

    async find(id: mongoose.Types.ObjectId): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async create(data: IBook): Promise<IBook> {
        //Just admin can create new book
        // Check unique name
        return await Book.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Partial<IBook>): Promise<IBook | null> {
        //Just admin can update book
        //Check unique name
        let book = await Book.findById(id);
        if (!book) {
            return null;
        }
        Object.assign(book, data);
        return await book.save();
    }

    async delete(id: mongoose.Types.ObjectId): Promise<IBook | null> {
        //Just admin can delete book
        let book = await Book.findById(id);
        return !book ? null : await book.deleteOne();
    }
}

export default BookService;