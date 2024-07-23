import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-download-csv-user',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatCardModule, MatSnackBarModule, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './download-csv-user.component.html',
  styleUrl: './download-csv-user.component.css'
})
export class DownloadCsvUserComponent {

  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  constructor() { };

  downloadCsv() {
    this.userService.downloadFileCsvUsers().subscribe({
      next: (data: BlobPart) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users-data.csv';
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
