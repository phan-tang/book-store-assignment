import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesRoutingModule } from './admin-categories-routing.module';

import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminCategoryListComponent,
    AddCategoryPageComponent
  ],
  imports: [
    CommonModule,
    AdminCategoriesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class AdminCategoriesModule { }
