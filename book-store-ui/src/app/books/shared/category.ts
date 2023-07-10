interface CategoryItem {
    id: string;
    name: string;
    description: string;
}

interface CategoryListData {
    data: CategoryItem[];
    total: number;
    page?: number;
}

export { CategoryItem, CategoryListData }