import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserListData } from '../shared/user';
import { UserService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap, catchError } from 'rxjs';

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

  constructor(private service: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.service.getUsers('').subscribe((data: UserListData) => {
      this.userList = data;
    });
  }

  handleChangePage(event: PageEvent) {
    this.service.getUsers(`?per-page=${event.pageSize}&page=${event.pageIndex + 1}`).subscribe((data: UserListData) => {
      this.userList = data;
    });
  }

  handleDelete(id: string) {
    this.service.deleteUser(id).pipe(
      switchMap(() => this.service.getUsers('')),
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
}
