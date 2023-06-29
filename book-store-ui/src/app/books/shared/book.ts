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
    average_rating_star: number;
}

export interface BookItemData {
    data: BookItem;
}

export interface BookListData {
    data: BookItem[],
    meta: {
        total: number;
        [key: string]: any;
    },
    links: Object
}