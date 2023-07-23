import { Component, Input } from '@angular/core';
import { NavItem } from '../../components/nav-item/nav-item.component';
import { appIconName, appName } from '../../constants/app.constants';

export interface ChangeMode {
  link: string;
  icon: string;
  tooltip: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  user: string | null = null;
  appName: string = appName;
  iconName: string = appIconName;
  @Input() changeMode!: ChangeMode | null;
  @Input() leftItems!: NavItem[];
  @Input() rightItems!: NavItem[];

  constructor() {
    let user = sessionStorage.getItem('user');
    this.user = user ? JSON.parse(user).name : '';
  }
}
