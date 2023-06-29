import { faker } from '@faker-js/faker';
import { ICategory } from '../../interfaces/model';

class CategoryFactory {

    constructor() { }

    async getValue(): Promise<ICategory> {
        let newCategory: ICategory = {
            name: faker.lorem.text(),
            description: faker.lorem.text()
        };
        return newCategory;
    }
}

export default CategoryFactory;