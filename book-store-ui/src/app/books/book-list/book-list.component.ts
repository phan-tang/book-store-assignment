import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';
import { BookListData } from '../shared/book';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookList: BookListData | null = null;

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.getBooks().subscribe((data: BookListData) => {
      this.bookList = data;
    });
  }
}
