interface ICategory {
    name: string;
    description: string;
}

interface ICategoryResource {
    data: ICategory[] | ICategory | null;
    total?: number;
    page?: number;
}

export { ICategory, ICategoryResource };