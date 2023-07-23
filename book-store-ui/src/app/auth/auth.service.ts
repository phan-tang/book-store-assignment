import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserData } from './shared/user';
import { LoginData, LogoutData } from './shared/auth';

@Injectable()
export class AuthService {

    resource: string = 'auth';

    constructor(private http: HttpClient) { }

    login(value: Object): Observable<LoginData> {
        return this.http.post<LoginData>(environment.apiURL + `${this.resource}/login`, value, { withCredentials: true });
    }

    register(value: Object): Observable<UserData> {
        return this.http.post<UserData>(environment.apiURL + `${this.resource}/register`, value);
    }

    logout(): Observable<LogoutData> {
        return this.http.delete<LogoutData>(environment.apiURL + `${this.resource}/logout`, { withCredentials: true });
    }

    isAuthenticated() {
        let user = sessionStorage.getItem('user');
        let token = user ? JSON.parse(user).access_token : null;
        return token;
    }

    isAdmin() {
        let user = sessionStorage.getItem('user');
        let role = user ? JSON.parse(user).role : false;
        return role;
    }
}