import { Component, Input, OnInit } from '@angular/core';
import { BookItem } from '../shared/book';

import { unit, imageBucketName } from 'src/app/shared/constants/app.constants';
import { environment } from 'src/environments/environment';
import { BookService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookItem!: BookItem;
  unit: string = unit;
  imageLink: string = '';
  currentURL: string = this.router.url;

  constructor(private service: BookService, private router: Router) { }

  ngOnInit(): void {
    this.imageLink = [environment.s3URL, imageBucketName, this.bookItem.image].join('/');
  }

  handleAddBookToCart(bookItem: BookItem) {
    this.service.addBookToCart(bookItem);
  }
}
