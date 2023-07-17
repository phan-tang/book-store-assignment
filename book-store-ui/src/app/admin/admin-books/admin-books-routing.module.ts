import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminBookDetailsComponent } from './admin-book-details/admin-book-details.component';
import { UpdateBookPageComponent } from './update-book-page/update-book-page.component';

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
    },
    {
        path: ':id',
        pathMatch: 'full',
        component: AdminBookDetailsComponent
    },
    {
        path: 'update/:id',
        pathMatch: 'full',
        component: UpdateBookPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminBooksRoutingModule { }