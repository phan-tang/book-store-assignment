import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthGuardService as AuthGuard } from '../auth/auth.guard.service';

import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';


@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
})
export class CoreModule { }
