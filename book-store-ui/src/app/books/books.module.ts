import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookCardComponent } from './book-card/book-card.component';
import { BookListComponent } from './book-list/book-list.component';

import { SharedModule } from '../shared/shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookService } from './books.service';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';

@NgModule({
  declarations: [
    BookCardComponent,
    BookListComponent,
    BookDetailsComponent,
    AddBookPageComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: [BookService]
})
export class BooksModule { }