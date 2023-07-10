import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService as AuthGuard } from './auth.guard.service';

const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginPageComponent
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterPageComponent
    },
    {
        path: 'logout',
        pathMatch: 'full',
        component: LogoutComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }