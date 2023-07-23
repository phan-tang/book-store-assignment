import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { BookService } from 'src/app/books/books.service';

import { BookListData } from 'src/app/books/shared/book';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.scss'],
})
export class AdminBookListComponent implements OnInit {
  bookList: BookListData | null = null;

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.getBooks('').subscribe((data: BookListData) => {
      this.bookList = data;
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getBooks(`?per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: BookListData) => {
      this.bookList = data;
    });
  }
}
