import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormItem } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$#!%*?&]).{5,}$/)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$#!%*?&]).{5,}$/)
      ]),
    },
    {
      validators: this.matchConfirmPasswordValidator,
    }
  );
  fields: FormItem[] = [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'text'
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'text'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'text'
    },
    {
      name: 'password',
      title: 'Password',
      type: 'password',
      errorMessages: {
        pattern: 'Your password must contain lowercase letters, at least 1 uppercase letter, numbers and symbols',
      }
    },
    {
      name: 'confirmPassword',
      title: 'Confirm Password',
      type: 'password',
      errorMessages: {
        pattern: 'Your password must contain lowercase letters, at least 1 uppercase letter, numbers and symbols',
      }
    }
  ];

  handleSubmit(value: Object) {
  }

  matchConfirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return {
        matchconfirmpassword: true
      };
    }
    return null;
  }
}
