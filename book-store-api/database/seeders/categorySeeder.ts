import { faker } from '@faker-js/faker';
import { ICategory } from '../../interfaces/model';
import { Category } from '../../models';

class CategorySeeder {

    seed() {
        let data: ICategory[] = [
            {
                name: 'Drama',
                description: faker.lorem.text()
            },
            {
                name: 'Sport',
                description: faker.lorem.text()
            },
            {
                name: 'Comedy',
                description: faker.lorem.text()
            }
        ];

        Category.create(data);
        console.log('Completed seeding category data');
    }
}

export default CategorySeeder;