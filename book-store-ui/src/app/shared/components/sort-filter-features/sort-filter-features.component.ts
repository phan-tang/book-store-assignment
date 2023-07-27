import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dropdown, Params } from '../dropdown/dropdown.component';

export interface Features {
  [key: string]: Dropdown;
}

@Component({
  selector: 'app-sort-filter-features',
  templateUrl: './sort-filter-features.component.html',
  styleUrls: ['./sort-filter-features.component.scss']
})
export class SortFilterFeaturesComponent implements OnInit {
  @Input() features!: Features;
  @Output() handleApplySortFilter = new EventEmitter<string>();
  keys: string[] | null = null;
  constructor() { }

  ngOnInit(): void {
    this.keys = Object.keys(this.features);
  }

  handleClickDropdownItem(params: Params) {
    Object.keys(params).forEach(key => {
      this.features[key].value = params[key]
    })
  }

  handleClickApply() {
    this.handleApplySortFilter.emit(this.getUrlParams());
  }

  getUrlParams = (): string => {
    return Object.keys(this.features).map((key) => (`${key}=${this.features[key].value.value.toLowerCase()}`)).join('&');
  }
}
