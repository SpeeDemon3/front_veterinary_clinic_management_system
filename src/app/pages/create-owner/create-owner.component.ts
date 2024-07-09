import { Component, inject } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { OwnerRequest } from '../../interfaces/owner-request';

@Component({
  selector: 'app-create-owner',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './create-owner.component.html',
  styleUrl: './create-owner.component.css'
})
export class CreateOwnerComponent {

  private ownerService = inject(OwnerService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formCreateOwner = this.formBuild.group({
    idPet: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
    phoneNumber: ['', Validators.required]
  })

  createOwner() {
    if (this.formCreateOwner.invalid) return;

    const object:OwnerRequest = {
      name: this.formCreateOwner.value.name ?? '',
      lastName: this.formCreateOwner.value.lastName ?? '',
      email: this.formCreateOwner.value.email ?? '',
      dni: this.formCreateOwner.value.dni ?? '',
      phoneNumber: this.formCreateOwner.value.phoneNumber ?? ''
    }

    const idPet : number = Number(this.formCreateOwner.value.idPet ?? 0);

    this.ownerService.addOwner(idPet, object).subscribe(
      {
        next: (data) => {
          if (data) {
            alert("Owner created successfully.");
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not register.");
          }
        },
        error: (err) => {
          console.log('Create owner error: ', err.message);
          console.log(err);
        }
      })
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
