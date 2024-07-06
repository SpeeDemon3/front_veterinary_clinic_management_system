import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { OwnerResponse } from '../interfaces/owner-response';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }

  findByEmail(email : string) : Observable<OwnerResponse> {
    return this.http.get<OwnerResponse>(`${this.UrlBase}/owner/findByEmail/${email}`);
  }

  findOwnerByDni(dni: string) : Observable<OwnerResponse> {
    return this.http.get<OwnerResponse>(`${this.UrlBase}/owner/findByDni/${dni}`);
  }

  findById(id : number) : Observable<OwnerResponse> {
    return this.http.get<OwnerResponse>(`${this.UrlBase}/owner/findById/${id}`);
  }

  findAll() : Observable<OwnerResponse[]> {
    return this.http.get<OwnerResponse[]>(`${this.UrlBase}/owner/findAll`);
  }

}
