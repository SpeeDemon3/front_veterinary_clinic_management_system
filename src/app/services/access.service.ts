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

  signup(object : SignUpRequest) : Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(`${this.UrlBase}/user/signup`, object);
  }

  login(object : LoginRequest) : Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(`${this.UrlBase}/user/login`, object);
  }

  findAll() : Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.UrlBase}/user/findAll`);
  }

}
