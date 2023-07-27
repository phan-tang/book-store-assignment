import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ReportListData } from '../shared/report';
import { ReportService } from '../report.service';

import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

import { map } from 'rxjs';

@Component({
  selector: 'app-admin-report-page',
  templateUrl: './admin-report-page.component.html',
  styleUrls: ['./admin-report-page.component.scss']
})
export class AdminReportPageComponent implements OnInit {
  reportList: ReportListData | null = null;
  displayedColumns: string[] = ['report_time', 'authors', 'categories', 'books', 'price', 'average_price', 'final_price', 'average_final_price', 'quantity'];
  displayedColumnTitles: {
    [key: string]: string;
  } = {
      report_time: 'Report time',
      authors: 'Authors',
      categories: 'Catgories',
      books: 'Books',
      price: 'Price',
      average_price: 'Average price',
      final_price: 'Final price',
      average_final_price: 'Average final price',
      quantity: 'Quantity'
    };
  actions: string[] = ['details'];
  params: string = '';
  features: Features = {
    sort: {
      value: {
        title: 'Ascending',
        value: 'asc'
      },
      options: [
        {
          title: 'Ascending',
          value: 'asc'
        },
        {
          title: 'Descending',
          value: 'desc'
        }
      ]
    },
    'sort-by': {
      value: {
        title: 'Report time',
        value: 'report_time'
      },
      options: [
        {
          title: 'Report time',
          value: 'report_time'
        },
        {
          title: 'Authors',
          value: 'authors'
        },
        {
          title: 'Categories',
          value: 'categories'
        },
        {
          title: 'Price',
          value: 'price'
        },
        {
          title: 'Average price',
          value: 'average_price'
        },
        {
          title: 'Final price',
          value: 'final_price'
        },
        {
          title: 'Average final price',
          value: 'average_final_price'
        },
        {
          title: 'Quantity',
          value: 'quantity'
        },
      ]
    }
  };

  constructor(private service: ReportService) { }

  ngOnInit(): void {
    this.service.getReports('').pipe(map((data) => {
      let reportData = data.data.map((item) => ({ ...item, id: item.report_time }));
      return { ...data, data: reportData };
    })).subscribe((data: ReportListData) => {
      this.reportList = data;
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getReports(`?${this.params}&per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: ReportListData) => {
      this.reportList = data;
    });
  }

  handleApplySortFilter(params: string) {
    this.service.getReports(`?${params}`).subscribe((data: ReportListData) => {
      this.reportList = data;
    });
    this.params = params;
  }
}
