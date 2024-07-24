import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-download-json-invoice',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatCardModule, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './download-json-invoice.component.html',
  styleUrl: './download-json-invoice.component.css'
})
export class DownloadJsonInvoiceComponent {


  private invoiceService = inject(InvoiceService);
  private snackBar = inject(MatSnackBar);

  downloadJson() {
    this.invoiceService.downloadFileJsonInvoice().subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoices.json';
        a.click();
        window.URL.revokeObjectURL(url);

        this.snackBar.open('File downloaded successfully', 'Close', { duration: 3000 });
      },
      error: (err: any) => {
        console.error('Download error:', err);
        this.snackBar.open('Failed to download file', 'Close', { duration: 3000 });
      }
    });
  }

}
