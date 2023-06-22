import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookItem, BookItemData } from '../shared/book';
import { BookService } from '../books.service';

import { unit } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookItem: BookItem | null = null;
  unit: string = unit;

  constructor(private service: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.service.getBookById(id).subscribe((data: BookItemData) => {
      this.bookItem = data.data;
    });
  }
}
