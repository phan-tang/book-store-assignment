interface IBook {
    name: string;
    author_name: string;
    category_name: string;
    summary: string;
    price: number;
    final_price?: number;
    image: string;
    quantity: number;
}

interface IBookResource {
    data: IBook | null;
}

interface IBookCollection {
    data: IBook[] | null;
    total?: number;
    page?: number;
}

export { IBook, IBookResource, IBookCollection };