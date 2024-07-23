import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../interfaces/appointment-response';
import { AppointmentRequest } from '../interfaces/appointment-request';
import { AppointmentRequestUpdate } from '../interfaces/appointment-request-update';

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

  findAppointmentsByPetId(idPet : number) : Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.UrlBase}/appointment/findAppointmentsByPetId/${idPet}`);
  }

  findAppointmentByVeterinarianId(idVeterinarian : number) : Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.UrlBase}/appointment/findAppointmentsByVeterinarianId/${idVeterinarian}`);
  }

  findAppointmentsByDate(date : string) : Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.UrlBase}/appointment/findAppointmentsByDate/${date}`);
  }

  createAppointment(idVeterinarian : number, idPet : number, appointment : AppointmentRequest) : Observable<AppointmentRequest> {
    return this.http.post<AppointmentResponse>(`${this.UrlBase}/appointment/addAppointment/${idVeterinarian}/${idPet}`, appointment);
  }

  deleteAppointmentById(id : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.UrlBase}/appointment/deleteById/${id}`);
  }

  updateAppointmentById(id: number, appointment: AppointmentRequestUpdate): Observable<AppointmentResponse> {
    return this.http.put<AppointmentResponse>(`${this.UrlBase}/appointment/updateById/${id}`, appointment)
  }

  downloadFileCsvAppointments(): Observable<Blob> {
    return this.http.get(`${this.UrlBase}/appointment/appointmentInfoDownloadCsv`, { responseType: 'blob' });
  }
  
}
