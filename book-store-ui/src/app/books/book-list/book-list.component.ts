import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';
import { BookListData } from '../shared/book';
import { PageEvent } from '@angular/material/paginator';
import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

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
        },
        {
          title: 'Sport',
          value: 'Sport'
        },
        {
          title: 'Comedy',
          value: 'Comedy'
        },
        {
          title: 'Drama',
          value: 'Drama'
        },
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
