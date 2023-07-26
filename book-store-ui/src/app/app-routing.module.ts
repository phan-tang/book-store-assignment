import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';

import { AuthGuardService as AuthGuard } from './auth/auth.guard.service';
import { RoleGuardService as RoleGuard } from './auth/role.guard.service';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/books',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'books',
        loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: '',
        redirectTo: '/admin/books',
        pathMatch: 'full'
      },
      {
        path: 'books',
        loadChildren: () => import('./admin/admin-books/admin-books.module').then(m => m.AdminBooksModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./admin/admin-users/admin-users.module').then(m => m.AdminUsersModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./admin/admin-categories/admin-categories.module').then(m => m.AdminCategoriesModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./admin/admin-report/admin-report.module').then(m => m.AdminReportModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
