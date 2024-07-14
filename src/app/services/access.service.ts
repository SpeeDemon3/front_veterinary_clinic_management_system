import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseAccess } from '../interfaces/response-access';
import { SignUpRequest } from '../interfaces/sign-up-request';
import { LoginRequest } from '../interfaces/login-request';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }


/*
  signup(object : SignUpRequest) : Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.UrlBase}/user/signup`, object);
  }
*/

  signup(user: any): Observable<any> {
    return this.http.post(`${this.UrlBase}/user/signup`, user);
  }


  login(object : LoginRequest) : Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(`${this.UrlBase}/user/login`, object);
  }


}


