export interface BookItem {
    id: number;
    name: string;
    author_name: string;
    category_name: string;
    summary: string;
    price: string;
    final_price: string;
    image: string;
    quantity: number;
}

export interface BookItemData {
    data: BookItem;
}

export interface BookListData {
    data: BookItem[];
    total: number;
    page?: number;
}