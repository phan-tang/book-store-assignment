import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';
import { ChangeMode } from '../header/header.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  changeMode: ChangeMode | null = null;
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
  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.changeMode = this.service.isAdmin() ? {
      link: '/admin',
      icon: 'admin_panel_settings',
      tooltip: 'Admin mode'
    } : null;
  }
}
