import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { BookItemData, BookListData } from './shared/book';

import { environment } from 'src/environments/environment';
import { CategoryListData } from './shared/category';
import { FormItemOption } from '../shared/components/form/form.component';

@Injectable()
export class BookService {

    resource: string = 'books';

    constructor(private http: HttpClient) { }

    getBooks(params: string): Observable<BookListData> {
        return this.http.get<BookListData>(environment.apiURL + this.resource + params);
    }

    getBookById(id: number): Observable<BookItemData> {
        return this.http.get<BookItemData>(environment.apiURL + `${this.resource}/${id}`);
    }

    createBook(value: Object): Observable<BookItemData> {
        return this.http.post<BookItemData>(environment.apiURL + `${this.resource}/`, value);
    }

    getCategories(params: string): Observable<FormItemOption[]> {
        return this.http.get<CategoryListData>(environment.apiURL + 'categories' + params).pipe(
            map(data => {
                return data.data.map(item => {
                    return {
                        value: item.name,
                        title: item.name
                    };
                });
            })
        );
    }
}