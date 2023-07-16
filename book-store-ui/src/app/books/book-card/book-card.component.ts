import { Component, Input, OnInit } from '@angular/core';
import { BookItem } from '../shared/book';

import { unit, imageBucketName } from 'src/app/shared/constants/app.constants';
import { environment } from 'src/environments/environment';
import { BookService } from '../books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookItem!: BookItem;
  unit: string = unit;
  imageLink: string = '';

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.imageLink = [environment.s3URL, imageBucketName, this.bookItem.image].join('/');
  }

  handleAddBookToCart(bookItem: BookItem) {
    this.service.addBookToCart(bookItem);
  }
}
