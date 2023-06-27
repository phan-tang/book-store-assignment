import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IBookService } from '../interfaces/service';
import { IBook } from '../interfaces/model';
import { Book } from '../models';

@injectable()
class BookService implements IBookService {

    constructor() { }

    async list(): Promise<IBook[]> {
        return [];
    }

    async find(id: mongoose.Types.ObjectId): Promise<IBook | null> {
        return Book.findById(id);
    }

    async create(data: Object): Promise<IBook> {
        return Book.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Object): Promise<IBook | null> {
        let book = this.find(id);
        if (!book) {
            return null;
        }
        return null;
    }

    async delete(id: mongoose.Types.ObjectId): Promise<boolean | null> {
        let book = this.find(id);
        return null;
    }
}

export default BookService;