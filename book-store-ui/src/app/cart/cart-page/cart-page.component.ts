import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BookListData } from 'src/app/books/shared/book';

import { unit } from 'src/app/shared/constants/app.constants';
import { totalmem } from 'os';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'final_price', 'quantity'];
  cartItems: BookListData | null = null;
  cartTotal: string = '0';
  discountCode: string = '';
  unit: string = unit;
  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getBooksInCart().subscribe((data: BookListData) => {
      this.cartItems = data;
      this.cartTotal = this.getCartTotal(data);
    });
  }

  applyDiscountCode() {
    console.log(this.discountCode);
  }

  getCartTotal(data: BookListData) {
    let total = 0;
    data.data.forEach(item => {
      total += item.quantity * parseFloat(item.final_price);
    })
    return total.toFixed(2);
  }
}
