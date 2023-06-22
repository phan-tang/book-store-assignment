import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required])
  });
  fields: FormItem[] = [
    {
      name: 'email',
      title: 'Email',
      type: 'text'
    },
    {
      name: 'password',
      title: 'Password',
      type: 'password'
    }
  ];

  handleSubmit(value: Object) {
    console.log('login')
  }
}
