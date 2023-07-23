import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { CategoryListData, CategoryItemData } from './shared/category';

import { environment } from 'src/environments/environment';
import { FormItemOption } from 'src/app/shared/components/form/form.component';

@Injectable()
export class CategoryService {

    resource: string = 'categories';

    constructor(private http: HttpClient) { }

    getCategories(params: string): Observable<CategoryListData> {
        return this.http.get<CategoryListData>(environment.apiURL + this.resource + params);
    }

    getCategoriesUsedForForm(params: string): Observable<FormItemOption[]> {
        return this.http.get<CategoryListData>(environment.apiURL + this.resource + params).pipe(
            map(({ data }) => data.map(item => ({ value: item.name, title: item.name })))
        );
    }

    getCategoryById(id: string): Observable<CategoryItemData> {
        return this.http.get<CategoryItemData>(environment.apiURL + `${this.resource}/${id}`);
    }

    createCategory(value: Object): Observable<CategoryItemData> {
        return this.http.post<CategoryItemData>(environment.apiURL + `${this.resource}/`, value);
    }

    updateCategory(id: string, value: Object): Observable<CategoryItemData> {
        return this.http.put<CategoryItemData>(environment.apiURL + `${this.resource}/${id}`, value);
    }

    deleteCategory(id: string): Observable<CategoryItemData> {
        return this.http.delete<CategoryItemData>(environment.apiURL + `${this.resource}/${id}`);
    }
}