import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Params {
  [key: string]: DropdownItem;
}

export interface Dropdown {
  value: DropdownItem;
  options: DropdownItem[];
}

export interface DropdownItem {
  title: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() dropdown!: Dropdown;
  @Input() key!: string;
  @Output() handleClick = new EventEmitter<Params>();

  constructor() { }

  handleClickDropdownItem(option: DropdownItem) {
    this.handleClick.emit({ [this.key]: option });
  }
}
