import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { OwnerResponse } from '../interfaces/owner-response';
import { OwnerRequest } from '../interfaces/owner-request';

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

  addOwner(idPet : number, owner: OwnerRequest) : Observable<OwnerRequest> {
    return this.http.post<OwnerRequest>(`${this.UrlBase}/owner/add/${idPet}`, owner);
  }

  deleteOwnerById(id : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.UrlBase}/owner/deleteById/${id}`);
  }

}
