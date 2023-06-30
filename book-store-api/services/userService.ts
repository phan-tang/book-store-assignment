import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { IUserService } from '../interfaces/service';
import { ITransformedQuery, IQuery, IUser, IUserResource } from '../interfaces/model';
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

    async list(query: IQuery): Promise<IUserResource> {
        //Just admin can get list of users
        let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
        let total = await User.countDocuments();
        let data = await User.find({}).
            sort([[transformedQuery.sortBy, transformedQuery.sort]]).
            skip((transformedQuery.page - 1) * transformedQuery.perPage).
            limit(transformedQuery.perPage);
        return {
            data,
            total,
            page: transformedQuery.page
        };
    }

    async find(id: string | number): Promise<IUserResource> {
        //Just admin can find user
        return { data: mongoose.isObjectIdOrHexString(id) ? await User.findById(id) : null };
    }

    async create(data: IUser): Promise<IUserResource> {
        //Just admin can create new user
        data.salt = Math.random() * 10;
        data.password = await bcrypt.hash(data.password, data.salt);
        let newUser = await this.checkUniqueTrue(User, 'email', data.email) ?
            await User.create(data) : null;
        return { data: newUser };
    }

    async update(id: string | number, data: Partial<IUser>): Promise<IUserResource> {
        //Check cannot modify user email
        //Just admin can update user
        //User can modify their information
        let user = mongoose.isObjectIdOrHexString(id) ? await User.findById(id) : null;
        if (!user) {
            return { data: null };
        }
        Object.assign(user, data);
        return { data: await user.save() };
    }

    async delete(id: string | number): Promise<IUserResource> {
        //Just admin can delete user
        let user = mongoose.isObjectIdOrHexString(id) ? await User.findById(id) : null;
        return {
            data: !user ? null : await user.deleteOne()
        };
    }
}

export default UserService;