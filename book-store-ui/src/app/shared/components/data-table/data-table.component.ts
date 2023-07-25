import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() data!: any[];
  @Input() columns!: string[];
  @Input() displayedColumnTitles!: {
    [key: string]: string;
  };
  @Output() handleDelete = new EventEmitter<string>();
  displayedColumns: string[] = [];
  currentURL: string = this.router.url;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'action'];
  }

  handleDeleteEvent(id: string) {
    this.handleDelete.emit(id);
  }
}
