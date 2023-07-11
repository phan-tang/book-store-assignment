import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookItem } from '../shared/book';
import { BookService } from '../books.service';

import { unit } from 'src/app/shared/constants/app.constants';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookItem: BookItem | null = null;
  unit: string = unit;

  constructor(private service: BookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.service.getBookById(id)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: ({ data }) => {
        this.bookItem = data
      },
      error: error => {
        this.router.navigate(['*']);
      }
    });
  }

  handleAddBookToCart(bookItem: BookItem) {
    this.service.addBookToCart(bookItem);
  }
}
