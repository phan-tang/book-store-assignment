import { Component } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';
import { appIconName, appName } from '../../constants/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  appName: string = appName;
  iconName: string = appIconName;
  leftItems: NavItem[] = [
    {
      link: "/books",
      name: "books",
      title: "Books",
      type: "nav-link"
    },
    {
      link: "/categories",
      name: "categories",
      title: "Categories",
      type: "nav-link"
    },
    {
      link: "/about",
      name: "about",
      title: "About",
      type: "nav-link"
    }
  ];

  rightItems: NavItem[] = [
    {
      link: "/cart",
      name: "shopping_cart",
      title: "Cart",
      type: "nav-icon",
    },
    {
      link: "/login",
      name: "account_circle",
      title: "Login",
      type: "nav-link"
    },
  ];
}
