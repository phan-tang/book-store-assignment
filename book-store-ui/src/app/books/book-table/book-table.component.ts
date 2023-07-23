import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BookItem } from '../shared/book';

import { environment } from 'src/environments/environment';
import { unit, imageBucketName } from 'src/app/shared/constants/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnChanges {
  @Input() bookData!: BookItem[];
  displayedColumns: string[] = ['name', 'final_price', 'quantity'];
  unit: string = unit;
  currentURL: string = this.router.url;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.bookData = this.bookData.map((item) => ({ ...item, imageLink: [environment.s3URL, imageBucketName, item.image].join('/') }))
  }
}
