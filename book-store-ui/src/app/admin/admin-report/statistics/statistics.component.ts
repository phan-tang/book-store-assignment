import { Component, OnInit } from '@angular/core';
import { ReportItemData } from '../shared/report';
import { ReportService } from '../report.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ReportAttributes } from '../report-table/report-table.component';

import { switchMap, catchError } from 'rxjs';

export interface SubResourceReport {
  title: string;
  subResource: string;
  key: string;
  attributes: ReportAttributes;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  time: string = this.route.snapshot.params['time'];
  reportData: ReportItemData | null = null;
  panelOpenState: boolean = false;
  subResourceReports: SubResourceReport[] = [
    {
      title: 'Author report',
      subResource: 'authors',
      key: 'author',
      attributes: {
        author: {
          title: 'Name',
          cols: 3
        },
        books: {
          title: 'Books',
          cols: 1
        },
        category: {
          title: 'Category',
          cols: 1
        },
        price:
        {
          title: 'Price',
          cols: 1
        },
        average_price:
        {
          title: 'Average price',
          cols: 2
        },
        final_price:
        {
          title: 'Final price',
          cols: 1
        },
        average_final_price:
        {
          title: 'Average final price',
          cols: 2
        },
        quantity:
        {
          title: 'Quantity',
          cols: 1
        }
      },
    },
    {
      title: 'Book report',
      subResource: 'books',
      key: 'book_id',
      attributes: {
        book_id: {
          title: 'Id',
          cols: 3
        },
        name: {
          title: 'Name',
          cols: 3
        },
        author: {
          title: 'Author',
          cols: 2
        },
        category: {
          title: 'Category',
          cols: 1
        },
        price: {
          title: 'Price',
          cols: 1
        },
        final_price: {
          title: 'Final price',
          cols: 1
        },
        quantity: {
          title: 'Quantity',
          cols: 1
        },
        created_at: {
          title: 'Created at',
          cols: 1
        },
        updated_at: {
          title: 'Updated at',
          cols: 1
        },
        deleted_at: {
          title: 'Deleted at',
          cols: 1
        }
      },
    },
    {
      title: 'Category report',
      subResource: 'categories',
      key: 'category',
      attributes: {
        category: {
          title: 'Name',
          cols: 2
        },
        books: {
          title: 'Books',
          cols: 1
        },
        authors: {
          title: 'Authors',
          cols: 1
        },
        price:
        {
          title: 'Price',
          cols: 1
        },
        average_price:
        {
          title: 'Average price',
          cols: 2
        },
        final_price:
        {
          title: 'Final price',
          cols: 1
        },
        average_final_price:
        {
          title: 'Average final price',
          cols: 2
        },
        quantity:
        {
          title: 'Quantity',
          cols: 1
        }
      }
    }
  ];

  constructor(private service: ReportService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ time }) => this.service.getReportByTime(time)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: ({ data }) => {
        this.reportData = data;
      },
      error: error => {
        this.router.navigate(['*']);
      }
    });
  }
}
