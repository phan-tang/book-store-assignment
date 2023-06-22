import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  lenght: number = 50;
  pageSizeOptions: number[] = [10, 50, 100];
  pageIndex: number = 1;
  pageSize: number = 10;
  constructor() { }

  ngOnInit(): void {
  }

  getData(event?: PageEvent) {
    console.log('get new page data');
  }

}
