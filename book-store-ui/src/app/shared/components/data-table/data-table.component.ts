import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() data!: any[];
  @Input() displayedColumns!: string[];
  @Input() displayedColumnTitles!: {
    [key: string]: string;
  };
  constructor() { }
}
