import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IUserService } from '../interfaces/service';
import { ITransformedQuery, IQuery, IUser } from '../interfaces/model';
import { User } from '../models';
import { UserModelConfig } from '../config/models';

import QueryService from './queryService';
import bcrypt from 'bcrypt';

@injectable()
class UserService extends QueryService implements IUserService {

    constructor() {
        super();
        this.modelConfig = new UserModelConfig();
    }

    async list(query: IQuery): Promise<IUser[]> {
        //Just admin can get list of users
        let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
        return await User.find({}).
            sort([[transformedQuery.sortBy, transformedQuery.sort]]).
            skip((transformedQuery.page - 1) * transformedQuery.perPage).
            limit(transformedQuery.perPage);
    }

    async find(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        //Just admin can find user
        return await User.findById(id);
    }

    async create(data: IUser): Promise<IUser> {
        //Just admin can create new user
        //Check unique email
        data.password = await bcrypt.hash(data.password, 10);
        return await User.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> {
        //Chek cannot modify user email
        //Just admin can update user
        //User can modify their information
        let user = await User.findById(id);
        if (!user) {
            return null;
        }
        Object.assign(user, data);
        return await user.save();
    }

    async delete(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        //Just admin can delete user
        let user = await User.findById(id);
        return !user ? null : await user.deleteOne();
    }
}

export default UserService;