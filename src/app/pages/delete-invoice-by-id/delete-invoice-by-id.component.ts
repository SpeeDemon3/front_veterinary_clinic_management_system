import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { InvoiceService } from '../../services/invoice.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-delete-invoice-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './delete-invoice-by-id.component.html',
  styleUrl: './delete-invoice-by-id.component.css'
})
export class DeleteInvoiceByIdComponent {

  private invoiceService = inject(InvoiceService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  public formDeleteInvoiceById = this.formBuilder.group({
    id: ['', [Validators.required]]
  })

  DeleteInvoiceByIdComponent() {
    if (this.formDeleteInvoiceById.invalid) return;

    const idInvoice : number = Number(this.formDeleteInvoiceById.value.id);

    if (isNaN(idInvoice)) {
      console.log(idInvoice);
      alert("Invalid invoice ID");
      return;
    }

    this.invoiceService.deleteById(idInvoice).subscribe({
      next: (response: any) => {
        console.log('Response received from deleteById:', response);
        if (response) {
          alert("Invoice deleted successfully.");
          this.router.navigate(['/findAllInvoice'])
        } else {
          alert("Could not delete invoice.");
        }
      },
      error: (error) => {
        console.error("Delete invoice error: ", error);
        if (error.message) {
          alert(`Error: 404`);
        } else {
          alert("An error occurred while trying to delete the invoice.");
        }
      }
    });

  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
