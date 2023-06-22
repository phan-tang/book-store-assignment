import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AddBookPageComponent } from './add-book-page/add-book-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BookListComponent
    },
    {
        path: 'add',
        pathMatch: 'full',
        component: AddBookPageComponent
    },
    {
        path: ':id',
        pathMatch: 'full',
        component: BookDetailsComponent
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }