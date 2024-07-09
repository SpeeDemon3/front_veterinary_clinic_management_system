import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Router } from '@angular/router';
import { PetRequest } from '../../interfaces/pet-request';

@Component({
  selector: 'app-create-pet',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './create-pet.component.html',
  styleUrl: './create-pet.component.css'
})
export class CreatePetComponent {

  private petService = inject(PetService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formCreatePet : FormGroup = this.formBuild.group({
    idVeterinarian: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    birthdate: ['', 
      [
        Validators.required, 
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
      ]
    ]
  })

  createPet() {
    if (this.formCreatePet.invalid) return;

    const object:PetRequest = {
      name: this.formCreatePet.value.name,
      description: this.formCreatePet.value.description,
      birthdate: this.formCreatePet.value.birthdate
    }

    const idVeterinarian : number = this.formCreatePet.value.idVeterinarian;

    this.petService.addPet(idVeterinarian ,object).subscribe(
      {
        next: (data) => {
          if (data) {
            alert("Pet created successfully.");
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not register.");
          }
        },
        error: (err) => {
          console.log('Create pet error: ', err.message);
          console.log(err);
        }
      })
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
