import { User } from '../../models';
import { IUser } from '../../interfaces/model';
import UserFactory from '../factories/userFactory';
import bcrypt from 'bcrypt';

class UserSeeder {
    private _count: number;

    constructor(count: number) {
        this._count = count;
    }

    async seed() {
        let salt = 10;
        let data: IUser[] = [
            {
                "first_name": "Admin",
                "last_name": "System",
                "email": "AdminSystem@email.com",
                "password": await bcrypt.hash("AdminSystem@123", salt), //AdminSystem@123
                "salt": salt,
                "is_admin": true
            }
        ];
        let factory = new UserFactory();
        for (let i = 0; i < this._count; i++) {
            data.push(await factory.getValue());
        }

        await User.create(data);
        console.log('Completed seeding user data');
    }
}

export default UserSeeder;