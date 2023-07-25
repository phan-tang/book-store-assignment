import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

import { UserItemData } from '../shared/user';
import { FormItem } from 'src/app/shared/components/form/form.component';

import { switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.scss']
})
export class UpdateUserPageComponent implements OnInit {
  userId: string = '';
  updateUserForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
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

  constructor(private service: UserService, private toastrService: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.service.getUserById(id)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: ({ data }) => {
        this.userId = data.id;
        this.updateUserForm.patchValue({ ...data })
      },
      error: error => {
        this.router.navigate(['*']);
      }
    });
  }

  handleSubmit(values: any) {
    this.service.updateUser(this.userId, values).subscribe({
      next: (data: UserItemData) => {
        this.toastrService.success('Updated a new user successfully');
        this.router.navigate(['/admin/users'])
      },
      error: error => {
        this.toastrService.error(error.error.error);
      }
    });
  }
}
