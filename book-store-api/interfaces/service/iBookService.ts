import { mongoose } from '../../config/database';
import IBook from "../model/iBook";

interface IBookService {
    list(): Promise<IBook[]>;
    find(id: mongoose.Types.ObjectId): Promise<IBook | null>;
    create(data: Object): Promise<IBook | null>;
    update(id: mongoose.Types.ObjectId, data: Object): Promise<IBook | null>;
    delete(id: mongoose.Types.ObjectId): Promise<boolean | null>;
}

export default IBookService;