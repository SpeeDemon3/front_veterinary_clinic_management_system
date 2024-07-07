import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { InvoiceResponse } from '../../interfaces/invoice-response';
import { InvoiceService } from '../../services/invoice.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-invoice-by-id',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-invoice-by-id.component.html',
  styleUrl: './find-invoice-by-id.component.css'
})
export class FindInvoiceByIdComponent {

  private invoiceService = inject(InvoiceService);
  public displayedColumns: string[] = ['id', 'invoiceNumber', 'totalPrice', 'client', 'dateOfIssue', 'state'];
  public dataSource = new MatTableDataSource<InvoiceResponse>();

  constructor() {}

  findInvoiceById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.invoiceService.findInvoiceById(id).subscribe({
        next: (invoiceData: InvoiceResponse) => {
          if (invoiceData) {
            this.dataSource.data = [invoiceData];
          } else {
            console.error("Invoice not found!!!");
            this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ningún usuario
          }
        },
        error: (err: any) => {
          console.error("Error finding invoice: ", err);
          this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
        }
      });
    } else {
      console.error("Invalid invoice ID.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }

}
