import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { AuthGuardService as AuthGuard } from '../auth/auth.guard.service';
import { RoleGuardService as RoleGuard } from '../auth/role.guard.service';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';

import { BookService } from '../books/books.service';
import { CategoryService } from '../admin/admin-categories/categories.service';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        RoleGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        BookService,
        CategoryService
    ],
})
export class CoreModule { }
