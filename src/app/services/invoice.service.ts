import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { InvoiceResponse } from '../interfaces/invoice-response';

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

}
