import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';
import { appsettings } from '../settings/appsettings';
import { UserRequestUpdate } from '../interfaces/user-request-update';

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

  findUserById(id : number) : Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.UrlBase}/user/findById/${id}`);
  }

  findByDni(dni : string) : Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.UrlBase}/user/findByDni/${dni}`);
  }

  updateById(id : number, user : UserRequestUpdate) {
    return this.http.put<UserResponse>(`${this.UrlBase}/user/updateById/${id}`, user);
  }

  deleteById(id : number) {
    return this.http.delete<boolean>(`${this.UrlBase}/user/deleteById/${id}`);
  }

  downloadFileCsvUsers(): Observable<Blob> {
    return this.http.get(`${this.UrlBase}/user/downloadFileCsvUsers`, { responseType: 'blob' });
  }

}
