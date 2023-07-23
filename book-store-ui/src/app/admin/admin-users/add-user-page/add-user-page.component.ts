import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem } from 'src/app/shared/components/form/form.component';
import { UserService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { UserItemData } from '../shared/user';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent {
  addUserForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$#!%*?&]).{5,}$/)
    ]),
    is_admin: new FormControl(false, [Validators.required])
  });

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
        pattern: 'Password must contain lowercase letters, at least 1 uppercase letter, numbers and symbols',
      }
    },
    {
      name: 'is_admin',
      title: 'Type',
      type: 'select',
      options: [
        {
          value: false,
          title: 'User'
        },
        {
          value: true,
          title: 'Admin'
        }
      ]
    },
  ];

  constructor(private service: UserService, private toastrService: ToastrService) { }

  handleSubmit(values: any) {
    this.service.createUser(values).subscribe({
      next: (data: UserItemData) => {
        this.toastrService.success('Created a new user successfully');
      },
      error: error => {
        this.toastrService.error(error.error.error);
      }
    });
  }
}
