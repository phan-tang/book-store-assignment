import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { CartPageComponent } from './cart-page/cart-page.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CartPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule,
    SharedModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: []
})
export class CartModule { }
