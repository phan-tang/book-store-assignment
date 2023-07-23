import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { BookItem, BookItemData, BookListData } from './shared/book';

import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BookService {

    resource: string = 'books';

    constructor(private http: HttpClient, private toastrService: ToastrService) { }

    getBooks(params: string): Observable<BookListData> {
        return this.http.get<BookListData>(environment.apiURL + this.resource + params);
    }

    getBookById(id: string): Observable<BookItemData> {
        return this.http.get<BookItemData>(environment.apiURL + `${this.resource}/${id}`);
    }

    createBook(value: Object): Observable<BookItemData> {
        return this.http.post<BookItemData>(environment.apiURL + `${this.resource}/`, value);
    }

    updateBook(id: string, value: Object): Observable<BookItemData> {
        return this.http.put<BookItemData>(environment.apiURL + `${this.resource}/${id}`, value);
    }

    deleteBook(id: string): Observable<BookItemData> {
        return this.http.delete<BookItemData>(environment.apiURL + `${this.resource}/${id}`);
    }

    addBookToCart(bookItem: BookItem) {
        let cart = this.getCartItems();
        let item = cart.filter((book) => book.id === bookItem.id && book.final_price === bookItem.final_price)[0];
        if (item) {
            item.quantity += 1;
        }
        else {
            cart.push({ ...bookItem, quantity: 1 });
        }
        this.toastrService.success('Added item to cart successfully');
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getCartItems(): BookItem[] {
        let cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    transformToFormData(values: any): FormData {
        let formData: FormData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        })
        return formData;
    }
}