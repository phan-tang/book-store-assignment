import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import { BookService } from '../books.service';
import { BookListData } from '../shared/book';
import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

import { CategoryState } from 'src/app/store/models/state.model';

import { map } from 'rxjs';
import { getCategoriesList } from 'src/app/store/selectors/categories.selector';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
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

  constructor(private service: BookService, private store: Store<CategoryState>) { }

  ngOnInit(): void {
    this.service.getBooks('').subscribe((data: BookListData) => {
      this.bookList = data;
    });
    this.store.select(getCategoriesList).pipe(map(({ categories }) => categories.map(item => ({ value: item.name, title: item.name })))).subscribe((data: any) => {
      this.features['category-name'].options = [{ title: 'All', value: '' }, ...data];
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getBooks(`?${this.params}&per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: BookListData) => {
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
