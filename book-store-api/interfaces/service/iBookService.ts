import { mongoose } from '../../config/database';
import { IBook } from "../model";

interface IBookService {
    list(query: Object): Promise<IBook[]>;
    find(id: mongoose.Types.ObjectId): Promise<IBook | null>;
    create(data: IBook): Promise<IBook | null>;
    update(id: mongoose.Types.ObjectId, data: Partial<IBook>): Promise<IBook | null>;
    delete(id: mongoose.Types.ObjectId): Promise<IBook | null>;
}

export default IBookService;