import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Output() changePage = new EventEmitter<PageEvent>();
  @Input() numberOfItems!: number;
  pageSizeOptions: number[] = [10, 15, 20, 50, 100];
  pageIndex: number = 0;
  pageSize: number = 10;
  constructor() { }

  handleChangePage(event?: PageEvent) {
    this.changePage.emit(event);
  }
}
