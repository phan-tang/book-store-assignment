import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface IconLink {
  name: string;
  link: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  minHeight: number = 200;
  iconName: string = "menu_book";
  iconSize: number = 50;
  svgItems: IconLink[] = [
    {
      name: 'facebook',
      link: 'https://vi-vn.facebook.com/'
    },
    {
      name: 'instagram',
      link: 'https://www.instagram.com/'
    },
    {
      name: 'twitter',
      link: 'https://twitter.com/'
    }
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.svgItems.forEach(item => {
      iconRegistry.addSvgIcon(item.name,
        sanitizer.bypassSecurityTrustResourceUrl(`../../../assets/${item.name}.svg`));
    })
  }
}
