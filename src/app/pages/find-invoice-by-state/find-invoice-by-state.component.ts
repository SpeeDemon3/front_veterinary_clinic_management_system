import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { InvoiceResponse } from '../../interfaces/invoice-response';
import { InvoiceService } from '../../services/invoice.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-invoice-by-state',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-invoice-by-state.component.html',
  styleUrl: './find-invoice-by-state.component.css'
})
export class FindInvoiceByStateComponent {
  
  private invoiceService = inject(InvoiceService);
  public displayedColumns: string[] = ['id', 'invoiceNumber', 'totalPrice', 'client', 'dateOfIssue', 'state'];
  public dataSource = new MatTableDataSource<InvoiceResponse>();

  constructor() { }
  
  findInvoiceByState(state: string) {
    this.invoiceService.findInvoicesByState(state).subscribe({
      next: (invoiceData: InvoiceResponse[]) => {
        if (Array.isArray(invoiceData) && invoiceData.length > 0) {
          this.dataSource.data = invoiceData;
        } else {
          console.error("Invoice not found!!!");
          this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ninguna factura
        }
      },
      error: (err: any) => {
        console.error("Error finding invoice: ", err);
        this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
      }
    });
  }

}
