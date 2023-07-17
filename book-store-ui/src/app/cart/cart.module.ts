import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { CartPageComponent } from './cart-page/cart-page.component';

import { SharedModule } from '../shared/shared.module';
import { BooksModule } from '../books/books.module';

@NgModule({
  declarations: [
    CartPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule,
    SharedModule,
    BooksModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: []
})
export class CartModule { }
