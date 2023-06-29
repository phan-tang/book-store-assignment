import { mongoose } from '../../config/database';
import { IUser } from '../model';

interface IUserService {
    list(): Promise<IUser[]>;
    find(id: mongoose.Types.ObjectId): Promise<IUser | null>;
    create(data: IUser): Promise<IUser | null>;
    update(id: mongoose.Types.ObjectId, data: Partial<IUser>): Promise<IUser | null>;
    delete(id: mongoose.Types.ObjectId): Promise<IUser | null>;
}

export default IUserService;