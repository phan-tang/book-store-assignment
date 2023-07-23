interface UserItem {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: string;
}

interface UserItemData {
    data: UserItem;
}

interface UserListData {
    data: UserItem[];
    total: number;
    page?: number;
}

export { UserItem, UserItemData, UserListData }