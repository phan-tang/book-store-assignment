import { injectable } from 'inversify';
import { mongoose } from '../config/database';
import { ICategoryService } from '../interfaces/service';
import { ICategory } from '../interfaces/model';
import { Category } from '../models';

@injectable()
class CategoryService implements ICategoryService {

    constructor() { }

    async list(query: Object): Promise<ICategory[]> {
        return await Category.find({});
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