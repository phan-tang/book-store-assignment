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
        try {
            //Just admin can get list of users
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let [total, data] = await Promise.all([
                User.countDocuments(),
                User.find({}).
                    sort([[transformedQuery.sortBy, transformedQuery.sort]]).
                    skip((transformedQuery.page - 1) * transformedQuery.perPage).
                    limit(transformedQuery.perPage)
            ]);
            return {
                data,
                total,
                page: transformedQuery.page
            };
        } catch (error) {
            throw error;
        }
    }

    async find(id: string | number): Promise<IUserResource> {
        try {
            //Just admin can find user
            return { data: mongoose.isObjectIdOrHexString(id) ? await User.findById(id) : null };
        } catch (error) {
            throw error;
        }
    }

    async create(data: IUser): Promise<IUserResource> {
        try {
            //Just admin can create new user
            if (!await this.checkUniqueTrue(User, 'email', data.email)) {
                return ({ data: null });
            }
            let salt = 10;
            let newUser = await User.create({
                ...data, salt, password: await bcrypt.hash(data.password, salt)
            });
            return { data: newUser };
        } catch (error) {
            throw error;
        }
    }

    async update(id: string | number, data: Partial<IUser>): Promise<IUserResource> {
        try {
            //Check cannot modify user email
            //Just admin can update user
            //User can modify their information
            let user = mongoose.isObjectIdOrHexString(id) ? await User.findById(id) : null;
            if (!user) {
                return { data: null };
            }
            Object.assign(user, data);
            return { data: await user.save() };
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string | number): Promise<IUserResource> {
        try {
            //Just admin can delete user
            let user = mongoose.isObjectIdOrHexString(id) ? await User.findById(id) : null;
            return {
                data: !user ? null : await user.deleteOne()
            };
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;