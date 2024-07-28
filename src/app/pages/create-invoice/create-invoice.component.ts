import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { InvoiceRequest } from '../../interfaces/invoice-request';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {

  private invoiceService = inject(InvoiceService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formCreateInvoice : FormGroup = this.formBuild.group({
    dniOwner: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
    invoiceNumber: ['', Validators.required],
    totalPrice: ['', Validators.required],
    state: ['', [Validators.required, this.stateValidator]]
  })

  createInvoice() {

    if (this.formCreateInvoice.invalid) return;

    const object : InvoiceRequest = {
      invoiceNumber: this.formCreateInvoice.value.invoiceNumber,
      totalPrice: this.formCreateInvoice.value.totalPrice,
      state: this.formCreateInvoice.value.state
    }

    const dniOwner : string = this.formCreateInvoice.value.dniOwner;

    this.invoiceService.createInvoice(dniOwner, object).subscribe(
      {
        next: (data) => {
          if (data) {
            alert("Invoice created successfully.");
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not register.");
          }
        },
        error: (err) => {
          console.log('Create invoice error: ', err.message);
          console.log(err);
        }
      })
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

  stateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validStates = ['paid', 'unpaid', 'PAID', 'UNPAID'];
      return validStates.includes(control.value) ? null : { invalidState: true };
    };

  }

}
