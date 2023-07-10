interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    salt: number;
    is_admin?: boolean;
}

interface IUserResource {
    data: IUser | null;
}

interface IUserCollection {
    data: IUser[] | null;
    total?: number;
    page?: number;
}

export { IUser, IUserResource, IUserCollection };