import { Action } from '@ngrx/store';
import { CategoryAction, CategoryActionType } from '../actions/categories.actions';
import { CategoryState } from '../models/state.model';

const initialState: CategoryState = { categories: [] };

export function CategoryReducer(
    state: CategoryState = initialState,
    action: Action
) {
    switch (action.type) {
        case CategoryActionType.SET_LIST:
            return { ...state, categories: (action as CategoryAction).payload };
        default:
            return state;
    }
}