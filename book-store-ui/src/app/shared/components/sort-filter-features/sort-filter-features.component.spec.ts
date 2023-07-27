import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortFilterFeaturesComponent } from './sort-filter-features.component';

describe('SortFilterFeaturesComponent', () => {
  let component: SortFilterFeaturesComponent;
  let fixture: ComponentFixture<SortFilterFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortFilterFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortFilterFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
