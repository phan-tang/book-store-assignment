import { Component, ViewEncapsulation } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';
import { ChangeMode } from '../header/header.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent {
  changeMode: ChangeMode = {
    link: '/',
    icon: 'account_circle',
    tooltip: 'User mode'
  };
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
