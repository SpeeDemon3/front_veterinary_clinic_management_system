import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { InvoiceResponse } from '../../interfaces/invoice-response';
import { InvoiceRequest } from '../../interfaces/invoice-request';

@Component({
  selector: 'app-update-invoice-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './update-invoice-by-id.component.html',
  styleUrl: './update-invoice-by-id.component.css'
})
export class UpdateInvoiceByIdComponent {

  private InvoiceService = inject(InvoiceService)
  private router = inject(Router)
  public formBuild = inject(FormBuilder)


  public invoiceId : number = 0

  constructor() { }

  public formUpdateInvoice: FormGroup = this.formBuild.group({
    invoiceNumber: [''],
    totalPrice: [''],
    state: ['']
  })

  findInvoiceById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.InvoiceService.findInvoiceById(id).subscribe({
        next: (data: InvoiceResponse) => {
          if (data) {
            this.invoiceId = id;
            this.formUpdateInvoice.patchValue(data);
          } else {
            console.error('Error fetching invoice:', data);
          }
        },
        error: (error: any) => {
          console.error('Error fetching invoice:', error);
        }
      });
    } else {
      console.error('Invalid invoice ID:', id);
    }
  }

  updateInvoiceById() {

    if (this.invoiceId === 0) {
      console.error('No invoice ID provided.');
      return;
    }

    console.log('Invoice ID:', this.invoiceId);
    console.log('Form value:', this.formUpdateInvoice.value)

    const object : InvoiceRequest = {
      invoiceNumber: this.formUpdateInvoice.value.invoiceNumber,
      totalPrice: this.formUpdateInvoice.value.totalPrice,
      state: this.formUpdateInvoice.value.state
    }

    console.log('Attempting to update with object:', object);

    this.InvoiceService.updateInvoice(this.invoiceId, object as InvoiceRequest).subscribe(
      {
        next: (data) => {
          if (data) {
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not update.");
          }
        },
        error: (err) => {
          console.error('Update error:', err);
          alert(`Update error: ${err.message || 'Unknown error'}`);
        }
      });
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
