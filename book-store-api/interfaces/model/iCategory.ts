interface ICategory {
    name: string;
    description: string;
}

interface ICategoryResource {
    data: ICategory | null;
}

interface ICategoryCollection {
    data: ICategory[] | null;
    total?: number;
    page?: number;
}

export { ICategory, ICategoryResource, ICategoryCollection };