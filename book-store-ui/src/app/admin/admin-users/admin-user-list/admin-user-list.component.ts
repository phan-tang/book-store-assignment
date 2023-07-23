import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserListData } from '../shared/user';
import { UserService } from '../users.service';

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

  constructor(private service: UserService) { }

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
}
