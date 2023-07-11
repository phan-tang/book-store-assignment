import { Component, Input } from '@angular/core';
import { BookItem } from '../shared/book';

import { unit } from 'src/app/shared/constants/app.constants';
import { BookService } from '../books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() bookItem!: BookItem;
  unit: string = unit;

  constructor(private service: BookService) { }

  handleAddBookToCart(bookItem: BookItem) {
    this.service.addBookToCart(bookItem);
  }
}
