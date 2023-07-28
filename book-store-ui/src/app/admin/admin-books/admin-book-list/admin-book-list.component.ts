import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/books/books.service';

import { BookListData } from 'src/app/books/shared/book';
import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

import { switchMap, catchError, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { getCategoriesList } from 'src/app/store/selectors/categories.selector';

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
    },
    'category-name': {
      value: {
        title: 'All',
        value: ''
      },
      options: [
        {
          title: 'All',
          value: ''
        }
      ]
    }
  };

  constructor(private service: BookService, private toastrService: ToastrService, private store: Store) { }

  ngOnInit(): void {
    this.service.getBooks('').subscribe((data: BookListData) => {
      this.bookList = data;
    });
    this.store.select(getCategoriesList).pipe(map(({ categories }) => categories.map(item => ({ value: item.name, title: item.name })))).subscribe((data: any) => {
      this.features['category-name'].options = [{ title: 'All', value: '' }, ...data];
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

  handleDelete(id: string) {
    this.service.deleteBook(id).pipe(
      switchMap(() => this.service.getBooks(`?${this.params}`)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: (data: BookListData) => {
        this.bookList = data;
        this.toastrService.success('Deleted this book successfully');
      },
      error: error => {
        this.toastrService.error('Deleted this book failed');
      }
    });
  }
}
