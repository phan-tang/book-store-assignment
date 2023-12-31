import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { BookCardComponent } from './book-card/book-card.component';
import { BookListComponent } from './book-list/book-list.component';

import { SharedModule } from '../shared/shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [
    BookCardComponent,
    BookListComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  exports: [
    BookListComponent,
    BookDetailsComponent
  ],
  providers: []
})
export class BooksModule { }