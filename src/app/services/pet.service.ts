import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetResponse } from '../interfaces/pet-response';
import { appsettings } from '../settings/appsettings';
import { PetRequest } from '../interfaces/pet-request';
import { PetRequestUpdate } from '../interfaces/pet-request-update';

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

  addPet(VeterinarianId : number, pet : PetRequest) : Observable<PetRequest> {
    return this.http.post<PetRequest>(`${this.UrlBase}/pet/add/${VeterinarianId}`, pet);
  }

  deletePetById(id : number) {
    return this.http.delete<boolean>(`${this.UrlBase}/pet/deleteById/${id}`);
  }

  updatePetById(id : number, pet : PetRequestUpdate) : Observable<PetResponse> {
    return this.http.put<PetResponse>(`${this.UrlBase}/pet/updateById/${id}`, pet);
  }

}
