import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RegisterPageComponent } from './register-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterPageComponent
      ],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('form'));
    htmlElement = debugElement.nativeElement;
  });

  it('button should not be clicked by default', () => {
    fixture.detectChanges();
    spyOn(component, 'handleSubmit');
    htmlElement = fixture.debugElement.query(By.css('button')).nativeElement;
    htmlElement.click();
    expect(component.handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('function handleSubmit can be called', () => {
    spyOn(component, 'handleSubmit');
    component.handleSubmit(new Object);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('form should be invalid by fields required errors', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form should be invalid by first name required error', () => {
    component.registerForm.controls['firstName'].setValue('');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email@email.com');
    component.registerForm.controls['password'].setValue('Password@1');
    component.registerForm.controls['confirmPassword'].setValue('Password@1');
    expect(component.registerForm.controls['firstName'].errors?.['required']).toBeTruthy();
  });

  it('form should be invalid by invalid email error', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email');
    component.registerForm.controls['password'].setValue('Password@1');
    component.registerForm.controls['confirmPassword'].setValue('Password@1');
    expect(component.registerForm.controls['email'].errors?.['email']).toBeTruthy();
  });

  it('form should be invalid by password pattern error', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email');
    component.registerForm.controls['password'].setValue('Password1');
    component.registerForm.controls['confirmPassword'].setValue('Password@1');
    expect(component.registerForm.controls['password'].errors?.['pattern']).toBeTruthy();
  });

  it('form should be invalid by password min length error', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email');
    component.registerForm.controls['password'].setValue('Pass@1');
    component.registerForm.controls['confirmPassword'].setValue('Password@1');
    expect(component.registerForm.controls['password'].errors?.['minlength']).toBeTruthy();
  });

  it('form should be invalid by confirm password pattern error', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email');
    component.registerForm.controls['password'].setValue('Password@1');
    component.registerForm.controls['confirmPassword'].setValue('Password1');
    expect(component.registerForm.controls['confirmPassword'].errors?.['pattern']).toBeTruthy();
  });

  it('form should be invalid by confirm password min length error', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email');
    component.registerForm.controls['password'].setValue('Password@1');
    component.registerForm.controls['confirmPassword'].setValue('Pass@1');
    expect(component.registerForm.controls['confirmPassword'].errors?.['minlength']).toBeTruthy();
  });

  it('form should be invalid by match confirm password error', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email@email.com');
    component.registerForm.controls['password'].setValue('Password@1');
    component.registerForm.controls['confirmPassword'].setValue('Passwor@1');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.registerForm.controls['firstName'].setValue('first name');
    component.registerForm.controls['lastName'].setValue('last name');
    component.registerForm.controls['email'].setValue('email@email.com');
    component.registerForm.controls['password'].setValue('Password@1');
    component.registerForm.controls['confirmPassword'].setValue('Password@1');
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('a tag should be navigate to login page', () => {
    htmlElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(htmlElement.getAttribute('href') === '/auth/login').toBeTruthy();
  });
});
