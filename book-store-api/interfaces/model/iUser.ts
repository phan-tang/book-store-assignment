interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_admin?: boolean;
}

interface IUserResource {
    data: IUser[] | IUser | null;
    total?: number;
    page?: number;
}

export { IUser, IUserResource };