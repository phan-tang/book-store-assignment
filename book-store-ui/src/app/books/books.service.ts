import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BookItemData, BookListData } from './shared/book';

import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
    constructor(private http: HttpClient) { }

    getBooks(): Observable<BookListData> {
        return this.http.get<BookListData>(environment.apiURL + 'products');
    }

    getBookById(id: number): Observable<BookItemData> {
        return this.http.get<BookItemData>(environment.apiURL + `products/${id}`);
    }
}