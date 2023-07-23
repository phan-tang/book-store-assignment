import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryListData } from '../shared/category';
import { CategoryService } from '../categories.service';

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

  constructor(private service: CategoryService) { }

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
}
