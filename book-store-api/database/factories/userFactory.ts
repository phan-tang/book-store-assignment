import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { IUser } from '../../interfaces/model';

class UserFactory {

    constructor() { }

    async getValue(): Promise<IUser> {
        let userInfor = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        };
        let password = await bcrypt.hash(userInfor.first_name + userInfor.last_name.replace(' ', '') + '@123', 10);
        let newUser: IUser = {
            first_name: userInfor.first_name,
            last_name: userInfor.last_name,
            email: userInfor.first_name.toLowerCase() + userInfor.last_name.replace(' ', '') + '@email.com',
            password: password
        };
        return newUser;
    }
}

export default UserFactory;