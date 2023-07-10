import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';

import { AuthGuardService as AuthGuard } from './auth/auth.guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/books',
    pathMatch: 'full',
    canLoad: [AuthGuard]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canLoad: [AuthGuard],
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
