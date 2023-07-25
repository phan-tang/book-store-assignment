import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { UpdateCategoryPageComponent } from './update-category-page/update-category-page.component';

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
    },
    {
        path: 'update/:id',
        pathMatch: 'full',
        component: UpdateCategoryPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminCategoriesRoutingModule { }