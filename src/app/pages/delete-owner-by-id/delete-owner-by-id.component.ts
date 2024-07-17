import { Component, inject } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-delete-owner-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './delete-owner-by-id.component.html',
  styleUrl: './delete-owner-by-id.component.css'
})
export class DeleteOwnerByIdComponent {

  private ownerService = inject(OwnerService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formDeleteOwnerById = this.formBuild.group({
    id: ['', [Validators.required]]
  })

  deleteOwnerById() {
    if (this.formDeleteOwnerById.invalid) return;

    const idOwner : number = Number(this.formDeleteOwnerById.value.id);  

    if (isNaN(idOwner)) {
      alert("Invalid owner ID");
      return;
    }

    this.ownerService.deleteOwnerById(idOwner).subscribe(
      (response) => {
        console.log('Response received from deleteById:', response);
        alert("Owner deleted successfully");
        this.router.navigate(['/findAllOwners']);
      },
      (error) => {
        alert("Error deleting owner");
        console.error("Delete pet error: ", error);
      }
    )
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
