import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BookListComponent
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