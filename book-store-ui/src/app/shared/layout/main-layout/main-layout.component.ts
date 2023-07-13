import { Component } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  leftItems: NavItem[] = [
    {
      link: "/app/books",
      name: "books",
      title: "Books",
      type: "nav-link"
    }
  ];

  rightItems: NavItem[] = [
    {
      link: "/app/cart",
      name: "shopping_cart",
      title: "Cart",
      type: "nav-icon",
    },
    {
      link: "/auth/logout",
      name: "account_circle",
      title: "Logout",
      type: "nav-link"
    },
  ];
  constructor() { }
}
