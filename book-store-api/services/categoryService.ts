import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { ICategoryService } from '../interfaces/service';
import { ICategory, ITransformedQuery } from '../interfaces/model';
import { Category } from '../models';

import BaseService from './baseService';
import { IQuery } from '../interfaces/model';

@injectable()
class CategoryService extends BaseService implements ICategoryService {

    constructor() {
        super();
    }

    async list(query: IQuery): Promise<ICategory[]> {
        let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
        return await Category.find({}).
            sort([[transformedQuery.sortBy, transformedQuery.sort]]).
            skip((transformedQuery.page - 1) * transformedQuery.perPage).
            limit(transformedQuery.perPage);
    }

    async find(id: mongoose.Types.ObjectId): Promise<ICategory | null> {
        return await Category.findById(id);
    }

    async create(data: ICategory): Promise<ICategory> {
        return await Category.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Partial<ICategory>): Promise<ICategory | null> {
        let category = await Category.findById(id);
        if (!category) {
            return null;
        }
        Object.assign(category, data);
        return await category.save();
    }

    async delete(id: mongoose.Types.ObjectId): Promise<ICategory | null> {
        let category = await Category.findById(id);
        return !category ? null : await category.deleteOne();
    }
}

export default CategoryService;