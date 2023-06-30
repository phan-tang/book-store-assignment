import { IBook } from "../../interfaces/model";
import { Book } from "../../models";
import { faker } from "@faker-js/faker";

class BookSeeder {
    private _count: number;

    constructor(count: number) {
        this._count = count;
    }

    async seed() {
        let categories: string[] = ['Drama', 'Sport', 'Comedy'];
        let data: IBook[] = [];
        let existedNames: string[] = [];
        categories.forEach(category => {
            for (let i = 0; i < this._count; i++) {
                let name: string = faker.commerce.productName();
                if (!existedNames.includes(name)) {
                    let price = parseFloat(faker.commerce.price({ min: 1, max: 100, dec: 2 }));
                    data.push({
                        name: name,
                        author_name: faker.company.name(),
                        category_name: category,
                        summary: faker.commerce.productDescription(),
                        price: price,
                        final_price: price,
                        image: `../../../assets/book${faker.number.int({ min: 1, max: 10 })}.jpg`,
                        quantity: faker.number.int({ min: 1, max: 100 })
                    });
                    existedNames.push(name);
                }
            }
        });
        Book.create(data);
        console.log('Completed seeding book data');
    }
}

export default BookSeeder;