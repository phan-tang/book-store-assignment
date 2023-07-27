import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { BookService } from 'src/app/books/books.service';

import { BookListData } from 'src/app/books/shared/book';
import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.scss'],
})
export class AdminBookListComponent implements OnInit {
  bookList: BookListData | null = null;
  params: string = '';
  features: Features = {
    sort: {
      value: {
        title: 'Ascending',
        value: 'asc'
      },
      options: [
        {
          title: 'Ascending',
          value: 'asc'
        },
        {
          title: 'Descending',
          value: 'desc'
        }
      ]
    },
    'sort-by': {
      value: {
        title: 'Name',
        value: 'name'
      },
      options: [
        {
          title: 'Id',
          value: 'id'
        },
        {
          title: 'Name',
          value: 'name'
        },
        {
          title: 'Summary',
          value: 'summary'
        },
        {
          title: 'Price',
          value: 'price'
        },
        {
          title: 'Author',
          value: 'author_name'
        },
        {
          title: 'Category',
          value: 'category_name'
        }
      ]
    }
  };

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

  handleApplySortFilter(params: string) {
    this.service.getBooks(`?${params}`).subscribe((data: BookListData) => {
      this.bookList = data;
    });
    this.params = params;
  }
}
