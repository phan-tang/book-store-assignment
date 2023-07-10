import { ICategory, ICategoryCollection, ICategoryResource } from '../model';

interface ICategoryService {
    list(query: Object): Promise<ICategoryCollection>;
    find(id: string | number): Promise<ICategoryResource>;
    create(data: ICategory): Promise<ICategoryResource>;
    update(id: string | number, data: Partial<ICategory>): Promise<ICategoryResource>;
    delete(id: string | number): Promise<ICategoryResource>;
}

export default ICategoryService;