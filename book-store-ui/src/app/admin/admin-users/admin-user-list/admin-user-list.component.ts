import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserListData } from '../shared/user';
import { UserService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap, catchError } from 'rxjs';

import { Features } from 'src/app/shared/components/sort-filter-features/sort-filter-features.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  userList: UserListData | null = null;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'is_admin'];
  displayedColumnTitles: {
    [key: string]: string;
  } = {
      id: 'Id',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      is_admin: 'Admin'
    };
  actions: string[] = ['update', 'delete'];
  params: string = '';
  features: Features = {
    sort: {
      value: {
        title: 'Ascending',
        value: 'asc'
      },
      options: [
        {
          title: 'Ascending',
          value: 'asc'
        },
        {
          title: 'Descending',
          value: 'desc'
        }
      ]
    },
    'sort-by': {
      value: {
        title: 'First Name',
        value: 'first_name'
      },
      options: [
        {
          title: 'Id',
          value: 'id'
        },
        {
          title: 'First Name',
          value: 'first_name'
        },
        {
          title: 'Last Name',
          value: 'last_name'
        }
      ]
    },
    'is-admin': {
      value: {
        title: 'All',
        value: ''
      },
      options: [
        {
          title: 'All',
          value: ''
        },
        {
          title: 'Admin',
          value: 'true'
        },
        {
          title: 'User',
          value: 'false'
        }
      ]
    }
  };

  constructor(private service: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.service.getUsers('').subscribe((data: UserListData) => {
      this.userList = data;
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getUsers(`?${this.params}&per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: UserListData) => {
      this.userList = data;
    });
  }

  handleDelete(id: string) {
    this.service.deleteUser(id).pipe(
      switchMap(() => this.service.getUsers(`?${this.params}`)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: (data: UserListData) => {
        this.userList = data;
        this.toastrService.success('Deleted this user successfully');
      },
      error: error => {
        this.toastrService.error('Deleted this user failed');
      }
    });
  }

  handleApplySortFilter(params: string) {
    this.service.getUsers(`?${params}`).subscribe((data: UserListData) => {
      this.userList = data;
    });
    this.params = params;
  }
}
