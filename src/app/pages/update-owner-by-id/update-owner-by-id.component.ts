import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { OwnerRequest } from '../../interfaces/owner-request';
import { OwnerResponse } from '../../interfaces/owner-response';
import { OwnerService } from '../../services/owner.service';

@Component({
  selector: 'app-update-owner-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './update-owner-by-id.component.html',
  styleUrl: './update-owner-by-id.component.css'
})
export class UpdateOwnerByIdComponent {

  private ownerService = inject(OwnerService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public ownerId: number = 0;

  constructor() { }

  public formUpdateOwner: FormGroup = this.formBuild.group({
    name: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    dni: ['', [Validators.pattern(/^\d{8}[A-Z]$/)]],
    phoneNumber: ['']
  })

  findOwnerById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.ownerService.findById(id).subscribe({
        next: (data: OwnerResponse) => {
          if (data) {
            this.ownerId = id;
            this.formUpdateOwner.patchValue(data);
          } else {
            console.error("Owner not found!!!");
          }
        },
        error: (err: any) => {
          console.error("Error finding owner: ", err);
        }
      });
    } else {
      console.error("Invalid ID");
    }
  }

  updateOwnerById() {
    
    if (this.formUpdateOwner.invalid) {
      return;
    }

    console.log('User ID:', this.ownerId);
    console.log('Form value:', this.formUpdateOwner.value)

    const object:OwnerRequest = {
      name: this.formUpdateOwner.value.name,
      lastName: this.formUpdateOwner.value.lastName,
      email: this.formUpdateOwner.value.email,
      dni: this.formUpdateOwner.value.dni,
      phoneNumber: this.formUpdateOwner.value.phoneNumber,
    }
    console.log('Attempting to update with object:', object);

    this.ownerService.updateOwnerById(this.ownerId, object as OwnerRequest).subscribe(
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
      })
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
