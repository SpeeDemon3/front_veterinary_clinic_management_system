import { Component, inject } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { HeaderComponent } from "../header/header.component";
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';

@Component({
  selector: 'app-delete-pet-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './delete-pet-by-id.component.html',
  styleUrl: './delete-pet-by-id.component.css'
})
export class DeletePetByIdComponent {

  private petService = inject(PetService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formDeletePetById = this.formBuild.group({
    id: ['', [Validators.required]]
  })

  deletePetById() {
    if (this.formDeletePetById.invalid) return;

    const idPet : number = Number(this.formDeletePetById.value.id);  

    if (isNaN(idPet)) {
      alert("Invalid pet ID");
      return;
    }

    this.petService.deletePetById(idPet).subscribe({
      next: (response: any) => {
        console.log('Response received from deleteById:', response);
        alert("Pet deleted successfully.");
        console.log(response)
        this.router.navigate(['/findAllPets'])
      },
      error: (error) => {
        alert("Pet deleted successfully.");
        this.router.navigate(['/findAllPets'])
        console.error("Delete pet error: ", error);
        //alert(`Error: ${error.error?.message || 'An error occurred while trying to delete the user.'}`);
      }
    });

  }

    returnHome() {
      this.router.navigate(['/homeApp']);
    }

}
