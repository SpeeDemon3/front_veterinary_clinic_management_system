import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { InvoiceResponse } from '../../interfaces/invoice-response';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-all-invoice',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './find-all-invoice.component.html',
  styleUrl: './find-all-invoice.component.css'
})
export class FindAllInvoiceComponent {

  private invoiceService = inject(InvoiceService);
  public invoiceList : InvoiceResponse[] = [];
  public displayedColumns: string[] = ['id', 'invoiceNumber', 'totalPrice', 'client', 'dateOfIssue', 'state'];

  constructor() {
    this.invoiceService.findAll().subscribe({
      next:(invoiceData) => {
        if (Array.isArray(invoiceData) && invoiceData.length > 0) {         
          this.invoiceList = invoiceData
        } else {
          console.error('No invoices found or data format incorrect', invoiceData);
        }
      },
      error: (err) => {
        console.log('Find all invoices error: ', err.message);
      }
    })
  }
}
