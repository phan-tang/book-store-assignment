import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { UpdateUserPageComponent } from './update-user-page/update-user-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AdminUserListComponent
    },
    {
        path: 'add',
        pathMatch: 'full',
        component: AddUserPageComponent
    },
    {
        path: 'update/:id',
        pathMatch: 'full',
        component: UpdateUserPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminUsersRoutingModule { }