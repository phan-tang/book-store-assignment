import { Component } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';
import { appIconName, appName } from '../../constants/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  user: string | null = null;
  appName: string = appName;
  iconName: string = appIconName;
  leftItems: NavItem[] = [
    {
      link: "/app/books",
      name: "books",
      title: "Books",
      type: "nav-link"
    },
    {
      link: "/app/books/add",
      name: "add-book",
      title: "Add Book",
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

  constructor() {
    this.user = localStorage.getItem('user');
  }
}
