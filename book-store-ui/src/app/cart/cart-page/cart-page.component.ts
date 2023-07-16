import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/books/books.service';
import { BookItem } from 'src/app/books/shared/book';

import { environment } from 'src/environments/environment';
import { unit, imageBucketName } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'final_price', 'quantity'];
  cartItems: BookItem[] | null = null;
  cartTotal: string = '0';
  discountCode: string = '';
  unit: string = unit;
  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.cartItems = this.service.getCartItems().map((item) => {
      return ({ ...item, imageLink: [environment.s3URL, imageBucketName, item.image].join('/') });
    });
    this.cartTotal = this.getCartTotal(this.cartItems);
  }

  applyDiscountCode() {
    console.log(this.discountCode);
  }

  getCartTotal(data: BookItem[]) {
    let total = 0;
    data.forEach(item => {
      total += item.quantity * parseFloat(item.final_price);
    })
    return total.toFixed(2);
  }
}
