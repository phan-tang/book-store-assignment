import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IBookService } from '../interfaces/service';
import { IBook } from '../interfaces/model';
import { Book } from '../models';

@injectable()
class BookService implements IBookService {

    constructor() { }

    async list(): Promise<IBook[]> {
        return await Book.find({});
    }

    async find(id: mongoose.Types.ObjectId): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async create(data: IBook): Promise<IBook> {
        return await Book.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Partial<IBook>): Promise<IBook | null> {
        let book = await Book.findById(id);
        if (!book) {
            return null;
        }
        Object.assign(book, data);
        return await book.save();
    }

    async delete(id: mongoose.Types.ObjectId): Promise<IBook | null> {
        let book = await Book.findById(id);
        return !book ? null : await book.deleteOne();
    }
}

export default BookService;