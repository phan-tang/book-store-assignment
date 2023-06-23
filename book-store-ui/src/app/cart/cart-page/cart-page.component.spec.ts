import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPageComponent],
      imports: [SharedModule, CommonModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
