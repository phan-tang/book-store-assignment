import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/books/books.service';
import { BookItem } from 'src/app/books/shared/book';

import { unit } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartItems: BookItem[] | null = null;
  cartTotal: string = '0';
  discountCode: string = '';
  unit: string = unit;
  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.cartItems = this.service.getCartItems();
    this.cartTotal = this.getCartTotal();
  }

  applyDiscountCode() {
    console.log(this.discountCode);
  }

  getCartTotal() {
    let total = 0;
    this.cartItems && this.cartItems.forEach(item => {
      total += item.quantity * parseFloat(item.final_price);
    })
    return total.toFixed(2);
  }

  handleDelete(id: string) {
    this.cartItems = this.cartItems && this.cartItems.filter(item => item.id !== id);
    this.cartTotal = this.getCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
