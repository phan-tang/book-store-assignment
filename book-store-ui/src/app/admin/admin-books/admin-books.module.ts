import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBooksRoutingModule } from './admin-books-routing.module';

import { BooksModule } from 'src/app/books/books.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminBookDetailsComponent } from './admin-book-details/admin-book-details.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';
import { UpdateBookPageComponent } from './update-book-page/update-book-page.component';

@NgModule({
  declarations: [
    AdminBookListComponent,
    AddBookPageComponent,
    AdminBookDetailsComponent,
    UpdateBookPageComponent
  ],
  imports: [
    CommonModule,
    AdminBooksRoutingModule,
    SharedModule,
    BooksModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AdminBooksModule { }
