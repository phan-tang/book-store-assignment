import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryListData } from '../shared/category';
import { CategoryService } from '../categories.service';

import { switchMap, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  actions: string[] = ['update', 'delete']


  constructor(private service: CategoryService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.service.getCategories('').subscribe((data: CategoryListData) => {
      this.categoryList = data;
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getCategories(`?per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: CategoryListData) => {
      this.categoryList = data;
    });
  }

  handleDelete(id: string) {
    this.service.deleteCategory(id).pipe(
      switchMap(() => this.service.getCategories('')),
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
}
