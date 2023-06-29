import BookSeeder from "./bookSeeder";
import CategorySeeder from "./categorySeeder";
import UserSeeder from "./userSeeder";

class DatabaseSeeder {

    seed() {

        const categorySeeder = new CategorySeeder();
        const userSeeder = new UserSeeder(3);
        const bookSeeder = new BookSeeder(15);

        console.log('Seeding...');
        categorySeeder.seed();
        userSeeder.seed();
        bookSeeder.seed();
    }
}

export default DatabaseSeeder;