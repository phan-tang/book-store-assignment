import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BookListData } from '../books/shared/book';
import { environment } from 'src/environments/environment';

@Injectable()
export class CartService {
    constructor(private http: HttpClient) { }

    getBooksInCart(): Observable<BookListData> {
        return this.http.get<BookListData>(environment.apiURL + 'products?per-page=2');
    }
}