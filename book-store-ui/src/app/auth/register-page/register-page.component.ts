import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormItem } from 'src/app/shared/components/form/form.component';
import { AuthService } from '../auth.service';

import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm: FormGroup = new FormGroup(
    {
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$#!%*?&]).{5,}$/)
      ]),
      confirm_password: new FormControl('', [
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
      name: 'first_name',
      title: 'First Name',
      type: 'text'
    },
    {
      name: 'last_name',
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
      name: 'confirm_password',
      title: 'Confirm Password',
      type: 'password',
      errorMessages: {
        pattern: 'Your password must contain lowercase letters, at least 1 uppercase letter, numbers and symbols',
      }
    }
  ];

  constructor(private service: AuthService, private toastrService: ToastrService, private router: Router, private route: ActivatedRoute) { }

  handleSubmit(value: Object) {
    this.service.register(value).pipe(map(() => true)).subscribe({
      next: () => {
        this.toastrService.success('Register successfully');
        this.router.navigate(['login'], { relativeTo: this.route.parent })
      }, error: ({ error }) => {
        this.toastrService.error(error.error);
      }
    });
  }

  matchConfirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    let password = control.get('password');
    let confirmPassword = control.get('confirm_password');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return {
        matchconfirmpassword: true
      };
    }
    return null;
  }
}
