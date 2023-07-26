import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { ReportListData } from '../shared/report';

import { switchMap, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SubResourceReport } from '../statistics/statistics.component';

export interface Tile {
  rows: number;
  cols: number;
  value: string;
}

export interface ReportAttributes {
  [key: string]: {
    title: string;
    cols: number;
  }
}

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
  @Input() time!: string;
  @Input() report!: SubResourceReport;

  dataRows: Tile[][] = [];
  columns: string[] = [];
  gridColumns: number = 0;

  constructor(private service: ReportService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.columns = Object.keys(this.report.attributes);
    this.gridColumns = this.getGridColumns();
    this.route.params.pipe(
      switchMap(({ time }) => this.service.getDetailsReportsByTime(time, this.report.subResource)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: (data: ReportListData) => {
        this.getDataRows(data.data);
      },
      error: error => {
        this.router.navigate(['*']);
      }
    });
  }

  getDataRows(data: any[]) {
    let current: Tile | null = null;
    let row: Tile[] = [];
    data.forEach((record, index) => {
      if (current && record[this.report.key] === current.value) { current.rows += 1; }
      else {
        current && this.dataRows.push([current, ...row]);
        row = [];
        current = { value: record[this.report.key], rows: 1, cols: this.report.attributes[this.report.key].cols };
      }
      row = this.generateAttributeColumns(row, record);
      index === (data.length - 1) && this.dataRows.push([current, ...row]);
    })
  }

  generateAttributeColumns(row: Tile[], record: any) {
    Object.keys(record).filter((attribute) => ![this.report.key, 'report_time'].includes(attribute)).forEach((attribute) => {
      row.push({ value: record[attribute], rows: 1, cols: this.report.attributes[attribute].cols });
    });
    return row;
  }

  getGridColumns(sum: number = 0) {
    Object.keys(this.report.attributes).forEach(key => {
      sum += this.report.attributes[key].cols;
    })
    return sum;
  }
}
