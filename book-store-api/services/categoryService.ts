import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { ICategoryService } from '../interfaces/service';
import { ICategory, ITransformedQuery, IQuery } from '../interfaces/model';
import { Category } from '../models';
import { CategoryModelConfig } from '../config/models';

import QueryService from './queryService';

@injectable()
class CategoryService extends QueryService implements ICategoryService {

    constructor() {
        super();
        this.modelConfig = new CategoryModelConfig();
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
        //Just admin can create new category
        //Check unique name
        return await Category.create(data);
    }

    async update(id: mongoose.Types.ObjectId, data: Partial<ICategory>): Promise<ICategory | null> {
        //Just admin can update category
        //Check unique name
        let category = await Category.findById(id);
        if (!category) {
            return null;
        }
        Object.assign(category, data);
        return await category.save();
    }

    async delete(id: mongoose.Types.ObjectId): Promise<ICategory | null> {
        //Just admin can delete category
        let category = await Category.findById(id);
        return !category ? null : await category.deleteOne();
    }
}

export default CategoryService;