import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../interfaces/appointment-response';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }

  findAllAppointment() : Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.UrlBase}/appointment/findAll`);
  }

  findAppointmentById(id : number) : Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(`${this.UrlBase}/appointment/findById/${id}`);
  }
  
}