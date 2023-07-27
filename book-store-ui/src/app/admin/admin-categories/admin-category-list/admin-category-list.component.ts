import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryListData } from '../shared/category';
import { CategoryService } from '../categories.service';

import { switchMap, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss']
})
export class AdminCategoryListComponent implements OnInit {
  categoryList: CategoryListData | null = null;
  displayedColumns: string[] = ['id', 'name', 'description'];
  displayedColumnTitles: {
    [key: string]: string;
  } = {
      id: 'Id',
      name: 'Name',
      description: 'Description'
    };
  actions: string[] = ['update', 'delete'];
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
        title: 'Name',
        value: 'name'
      },
      options: [
        {
          title: 'Id',
          value: 'id'
        },
        {
          title: 'Name',
          value: 'name'
        },
        {
          title: 'Description',
          value: 'description'
        }
      ]
    }
  };

  constructor(private service: CategoryService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.service.getCategories('').subscribe((data: CategoryListData) => {
      this.categoryList = data;
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getCategories(`?${this.params}&per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: CategoryListData) => {
      this.categoryList = data;
    });
  }

  handleDelete(id: string) {
    this.service.deleteCategory(id).pipe(
      switchMap(() => this.service.getCategories(`?${this.params}`)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: (data: CategoryListData) => {
        this.categoryList = data;
        this.toastrService.success('Deleted this category successfully');
      },
      error: error => {
        this.toastrService.error('Deleted this category failed');
      }
    });
  }

  handleApplySortFilter(params: string) {
    this.service.getCategories(`?${params}`).subscribe((data: CategoryListData) => {
      this.categoryList = data;
    });
    this.params = params;
  }
}
