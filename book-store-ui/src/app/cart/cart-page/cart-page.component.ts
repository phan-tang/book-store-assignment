import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BookListData } from 'src/app/books/shared/book';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'final_price', 'quantity'];
  cartItems: BookListData | null = null;
  discountCode: string = '';
  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getBooksInCart().subscribe((data: BookListData) => {
      this.cartItems = data;
    });
  }

  applyDiscountCode() {
    console.log(this.discountCode);
  }
}
