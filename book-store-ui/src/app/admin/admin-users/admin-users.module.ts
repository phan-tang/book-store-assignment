import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserService } from './users.service';

@NgModule({
  declarations: [
    AdminUserListComponent,
    AddUserPageComponent
  ],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [
    UserService
  ]
})
export class AdminUsersModule { }
