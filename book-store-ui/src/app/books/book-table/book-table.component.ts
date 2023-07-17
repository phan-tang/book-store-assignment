import { Component, OnInit, Input } from '@angular/core';
import { BookItem } from '../shared/book';

import { environment } from 'src/environments/environment';
import { unit, imageBucketName } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  @Input() bookData!: BookItem[];
  displayedColumns: string[] = ['name', 'final_price', 'quantity'];
  unit: string = unit;

  constructor() { }

  ngOnInit(): void {
    this.bookData = this.bookData.map((item) => ({ ...item, imageLink: [environment.s3URL, imageBucketName, item.image].join('/') }))
  }

}
