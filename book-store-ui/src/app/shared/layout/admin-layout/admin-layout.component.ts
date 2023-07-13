import { Component } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  leftItems: NavItem[] = [
    {
      link: "/admin/books",
      name: "books",
      title: "Books",
      type: "nav-link"
    },
    {
      link: "/admin/categories",
      name: "categories",
      title: "Categories",
      type: "nav-link"
    },
    {
      link: "/admin/users",
      name: "users",
      title: "Users",
      type: "nav-link"
    },
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
