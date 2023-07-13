import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminBooksRoutingModule } from './admin-books-routing.module';

@NgModule({
  declarations: [
    AdminBookListComponent,
    AddBookPageComponent
  ],
  imports: [
    CommonModule,
    AdminBooksRoutingModule,
    SharedModule
  ]
})
export class AdminBooksModule { }
