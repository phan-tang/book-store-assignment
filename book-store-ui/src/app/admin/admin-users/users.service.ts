import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserItemData, UserListData } from './shared/user';

import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    resource: string = 'users';

    constructor(private http: HttpClient) { }

    getUsers(params: string): Observable<UserListData> {
        return this.http.get<UserListData>(environment.apiURL + this.resource + params);
    }

    getUserById(id: string): Observable<UserItemData> {
        return this.http.get<UserItemData>(environment.apiURL + `${this.resource}/${id}`);
    }

    createUser(value: Object): Observable<UserItemData> {
        return this.http.post<UserItemData>(environment.apiURL + `${this.resource}/`, value);
    }

    updateUser(id: string, value: Object): Observable<UserItemData> {
        return this.http.put<UserItemData>(environment.apiURL + `${this.resource}/${id}`, value);
    }

    deleteUser(id: string): Observable<UserItemData> {
        return this.http.delete<UserItemData>(environment.apiURL + `${this.resource}/${id}`);
    }
}