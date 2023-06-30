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
    data: IBook[] | IBook | null;
    total?: number;
    page?: number;
}

export { IBook, IBookResource };