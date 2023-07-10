import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { ICategoryService } from '../interfaces/service';
import { ICategory, ITransformedQuery, IQuery, ICategoryResource, ICategoryCollection } from '../interfaces/model';
import { Category } from '../models';
import { CategoryModelConfig } from '../config/models';

import QueryService from './queryService';

@injectable()
class CategoryService extends QueryService implements ICategoryService {

    constructor() {
        super();
        this.modelConfig = new CategoryModelConfig();
    }

    async list(query: IQuery): Promise<ICategoryCollection> {
        try {
            let transformedQuery: ITransformedQuery = this.getTransformedQuery(query);
            let [total, data] = await Promise.all([
                Category.countDocuments(),
                Category.find({}).
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

    async find(id: string | number): Promise<ICategoryResource> {
        try {
            return { data: mongoose.isObjectIdOrHexString(id) ? await Category.findById(id) : null };
        } catch (error) {
            throw error;
        }
    }

    async create(data: ICategory): Promise<ICategoryResource> {
        try {
            //Just admin can create new category
            let newCategory = await this.checkUniqueTrue(Category, 'name', data.name) ?
                await Category.create(data) : null;
            return { data: newCategory };
        } catch (error) {
            throw error;
        }
    }

    async update(id: string | number, data: Partial<ICategory>): Promise<ICategoryResource> {
        try {
            //Just admin can update category
            let category = mongoose.isObjectIdOrHexString(id) ? await Category.findById(id) : null;
            if (!category || !await this.checkUniqueTrue(Category, 'name', data.name)) {
                return { data: null };
            }
            Object.assign(category, data);
            return { data: await category.save() };
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string | number): Promise<ICategoryResource> {
        try {
            //Just admin can delete category
            let category = mongoose.isObjectIdOrHexString(id) ? await Category.findById(id) : null;
            return { data: !category ? null : await category.deleteOne() };
        } catch (error) {
            throw error;
        }
    }
}

export default CategoryService;