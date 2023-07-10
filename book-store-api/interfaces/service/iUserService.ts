import { IUser, IUserCollection, IUserResource } from '../model';

interface IUserService {
    list(query: Object): Promise<IUserCollection>;
    find(id: string | number): Promise<IUserResource>;
    create(data: IUser): Promise<IUserResource>;
    update(id: string | number, data: Partial<IUser>): Promise<IUserResource>;
    delete(id: string | number): Promise<IUserResource>;
}

export default IUserService;