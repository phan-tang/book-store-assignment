import { createFeatureSelector } from "@ngrx/store";
import { CategoryState } from "../models/state.model";

export const getCategoriesList = createFeatureSelector<CategoryState>("categories");
