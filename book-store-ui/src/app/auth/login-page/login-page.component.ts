import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem } from 'src/app/shared/components/form/form.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
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

  constructor(private service: AuthService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  handleSubmit(value: Object) {
    this.service.login(value).subscribe({
      next: (data) => {
        AuthInterceptor.accessToken = data.access_token;
        localStorage.setItem('user', data.user);
        localStorage.setItem('access_token', data.access_token);
        this.toastrService.success('Login successfuly')
        this.router.navigate(['/']);
      },
      error: error => {
        this.toastrService.error('Email or password is incorrect');
      }
    });
  }
}
