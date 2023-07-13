import { Component, Input } from '@angular/core';
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
  @Input() leftItems!: NavItem[];
  @Input() rightItems!: NavItem[];

  constructor() {
    this.user = localStorage.getItem('user');
  }
}
