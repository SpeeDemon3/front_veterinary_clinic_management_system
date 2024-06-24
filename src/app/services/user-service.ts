import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';
import { appsettings } from '../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }

  findAll() : Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.UrlBase}/user/findAll`);
  }


}
