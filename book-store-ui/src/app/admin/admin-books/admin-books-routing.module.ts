import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AdminBookListComponent
    },
    {
        path: 'add',
        pathMatch: 'full',
        component: AddBookPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminBooksRoutingModule { }