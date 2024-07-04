import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetResponse } from '../interfaces/pet-response';
import { appsettings } from '../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }

  findAllPets() : Observable<PetResponse[]> {
    return this.http.get<PetResponse[]>(`${this.UrlBase}/pet/findAll`);
  }

  findPetById(id : number) : Observable<PetResponse> {
    return this.http.get<PetResponse>(`${this.UrlBase}/pet/findById/${id}`);
  }

  findByCode(code : string) : Observable<PetResponse> {
    return this.http.get<PetResponse>(`${this.UrlBase}/pet/findByCode/${code}`);
  }

}
