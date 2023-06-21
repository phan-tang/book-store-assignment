import { Component, Input } from '@angular/core';

export interface NavItem {
  link: string;
  name: string;
  title: string;
  type: "nav-link" | "nav-icon",
  badge?: string;
}

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() navItem!: NavItem;
}
