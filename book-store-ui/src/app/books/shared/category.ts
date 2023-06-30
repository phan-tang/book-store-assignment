export interface CategoryItem {
    id: number;
    name: string;
    description: string;
}

export interface CategoryListData {
    data: CategoryItem[],
    total: number,
    page?: number
}