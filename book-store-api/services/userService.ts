import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IUserService } from '../interfaces/service';
import { IUser } from '../interfaces/model';
import { User } from '../models';

import bcrypt from 'bcrypt';

@injectable()
class UserService implements IUserService {

    constructor() { }

    async list(): Promise<IUser[]> {
        return await User.find({});
    }

    async find(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        return await User.findById(id);
    }

    async create(data: IUser): Promise<IUser> {
        data.password = await bcrypt.hash(data.password, 10);
        return await User.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> {
        let user = await User.findById(id);
        if (!user) {
            return null;
        }
        Object.assign(user, data);
        return await user.save();
    }

    async delete(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        let user = await User.findById(id);
        return !user ? null : await user.deleteOne();
    }
}

export default UserService;