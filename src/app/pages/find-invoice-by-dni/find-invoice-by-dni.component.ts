import { Component, inject } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { HeaderComponent } from "../header/header.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { InvoiceResponse } from '../../interfaces/invoice-response';
import { InvoiceService } from '../../services/invoice.service';

@Component({
    selector: 'app-find-invoice-by-dni',
    standalone: true,
    templateUrl: './find-invoice-by-dni.component.html',
    styleUrl: './find-invoice-by-dni.component.css',
    imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule]
})
export class FindInvoiceByDniComponent {

  private invoiceService = inject(InvoiceService);
  public displayedColumns: string[] = ['id', 'invoiceNumber', 'totalPrice', 'client', 'dateOfIssue', 'state'];
  public dataSource = new MatTableDataSource<InvoiceResponse>();

  constructor() {}

  findInvoiceByDni(dni: string) {
    console.log(dni);
    if (dni.length === 9) {
      this.invoiceService.findByClientDni(dni).subscribe({
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
    } else {
      console.error("Invalid owner DNI.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el DNI no es válido
    }
  }

}
