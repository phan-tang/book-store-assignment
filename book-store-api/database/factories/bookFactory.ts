import { faker } from '@faker-js/faker';
import { IBook } from '../../interfaces/model';

class BookFactory {

    async getValue(name: string): Promise<IBook> {
        let price = parseFloat(faker.commerce.price({ min: 1, max: 100, dec: 2 }));
        let newBook: IBook = {
            name: name,
            author_name: faker.company.name(),
            category_name: '',
            summary: faker.commerce.productDescription(),
            price: price,
            final_price: price,
            image: '',
            quantity: faker.number.int({ min: 1, max: 100 })
        };
        return newBook;
    }
}

export default BookFactory;