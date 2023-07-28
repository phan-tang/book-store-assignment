import { Action } from "@ngrx/store";
import { CategoryItem } from "src/app/admin/admin-categories/shared/category";

export enum CategoryActionType {
    SET_LIST = '[CATEGORY] Set list of CATEGORY',
}

export class SetListCategoriesAction implements Action {

    readonly type = CategoryActionType.SET_LIST;
    constructor(public payload: Array<CategoryItem>) { }

}

export type CategoryAction = SetListCategoriesAction;