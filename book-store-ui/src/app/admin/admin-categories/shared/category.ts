interface CategoryItem {
    id: string;
    name: string;
    description: string;
}

interface CategoryItemData {
    data: CategoryItem;
}

interface CategoryListData {
    data: CategoryItem[];
    total: number;
    page?: number;
}

export { CategoryItem, CategoryItemData, CategoryListData }