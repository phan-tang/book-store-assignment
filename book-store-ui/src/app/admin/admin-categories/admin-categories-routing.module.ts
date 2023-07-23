import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AdminCategoryListComponent
    },
    {
        path: 'add',
        pathMatch: 'full',
        component: AddCategoryPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminCategoriesRoutingModule { }