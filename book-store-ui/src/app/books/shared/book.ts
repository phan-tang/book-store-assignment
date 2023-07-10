interface BookItem {
    id: string;
    name: string;
    author_name: string;
    category_name: string;
    summary: string;
    price: string;
    final_price: string;
    image: string;
    quantity: number;
}

interface BookItemData {
    data: BookItem;
}

interface BookListData {
    data: BookItem[];
    total: number;
    page?: number;
}

export { BookItem, BookItemData, BookListData }