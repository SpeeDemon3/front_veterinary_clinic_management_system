import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-download-csv-appointment',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatCardModule, MatSnackBarModule, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './download-csv-appointment.component.html',
  styleUrl: './download-csv-appointment.component.css'
})
export class DownloadCsvAppointmentComponent {

  private appointmentService = inject(AppointmentService);
  private snackBar = inject(MatSnackBar);

  constructor() { };

  downloadCsv() {
    this.appointmentService.downloadFileCsvAppointments().subscribe({
      next: (data: BlobPart) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'appointments-data.csv';
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
