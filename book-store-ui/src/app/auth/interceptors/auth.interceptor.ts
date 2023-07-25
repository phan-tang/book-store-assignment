import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from "@angular/common/http";

import { Observable, catchError, switchMap, throwError } from "rxjs";
import { TokenData } from "../shared/auth";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    static accessToken = '';
    refresh: boolean = false;
    constructor(private service: AuthService, private http: HttpClient) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        AuthInterceptor.accessToken = this.service.isAuthenticated();
        const request = req.clone({
            setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`,
            }
        });

        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !this.refresh) {
                this.refresh = true;
                return this.getAccessToken().pipe(switchMap(({ access_token }) => {
                    AuthInterceptor.accessToken = access_token;
                    this.storeAccessToken(access_token);
                    return next.handle(request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${AuthInterceptor.accessToken}`,
                        }
                    }));
                }));
            }
            this.refresh = false;
            return throwError(() => error);
        }));
    }

    storeAccessToken(token: string) {
        let data = sessionStorage.getItem('user');
        let user = data ? JSON.parse(data) : null;
        if (user) {
            user.access_token = token;
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }

    getAccessToken() {
        return this.http.post<TokenData>(environment.apiURL + `auth/refresh`, {}, { withCredentials: true });
    }
}