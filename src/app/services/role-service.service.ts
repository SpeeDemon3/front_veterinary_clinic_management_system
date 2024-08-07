import { inject, Injectable } from '@angular/core';
import { RoleResponse } from '../interfaces/role-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { RoleRequest } from '../interfaces/role-request';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }

  findAll() : Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>(`${this.UrlBase}/role/findAll`);
  }

  findRoleById(id : number) : Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.UrlBase}/role/findById/${id}`);
  }

  deleteRoleById(id : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.UrlBase}/role/deleteById/${id}`);
  }

  addRole(request : RoleRequest) : Observable<RoleResponse> {
    return this.http.post<RoleResponse>(`${this.UrlBase}/role/add`, request);
  }

  updateRoleById(id : number, request : RoleRequest) : Observable<RoleResponse> {
    return this.http.put<RoleResponse>(`${this.UrlBase}/role/updateById/${id}`, request);
  }

}
