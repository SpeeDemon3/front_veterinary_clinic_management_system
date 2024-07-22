import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { InvoiceResponse } from '../interfaces/invoice-response';
import { InvoiceRequest } from '../interfaces/invoice-request';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  private http = inject(HttpClient);
  private UrlBase = appsettings.apiUrl;

  constructor() { }

  findInvoiceById(id : number) : Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${this.UrlBase}/invoice/findById/${id}`);
  }

  findByClientDni(dni : string) : Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(`${this.UrlBase}/invoice/findByClientDni/${dni}`);
  }

  findAll() : Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(`${this.UrlBase}/invoice/findAll`);
  }

  findInvoicesByState(state : string) : Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(`${this.UrlBase}/invoice/findByState/${state}`);
  }

  createInvoice(dniOwner : string, invoiceRequest : InvoiceRequest) : Observable<InvoiceResponse> {
    return this.http.post<InvoiceResponse>(`${this.UrlBase}/invoice/add/${dniOwner}`, invoiceRequest);
  }

  deleteById(id : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.UrlBase}/invoice/deleteById/${id}`);
  }

  updateInvoice(id : number, invoiceRequest : InvoiceRequest) : Observable<InvoiceResponse> {
    return this.http.put<InvoiceResponse>(`${this.UrlBase}/invoice/updateById/${id}`, invoiceRequest);
  }


}
