import { mongoose } from '../../config/database';
import { ICategory } from '../model';

interface ICategoryService {
    list(query: Object): Promise<ICategory[]>;
    find(id: mongoose.Types.ObjectId): Promise<ICategory | null>;
    create(data: ICategory): Promise<ICategory | null>;
    update(id: mongoose.Types.ObjectId, data: Partial<ICategory>): Promise<ICategory | null>;
    delete(id: mongoose.Types.ObjectId): Promise<ICategory | null>;
}

export default ICategoryService;