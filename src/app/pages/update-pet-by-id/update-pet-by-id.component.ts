import { Component, inject, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { PetResponse } from '../../interfaces/pet-response';
import { PetRequestUpdate } from '../../interfaces/pet-request-update';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';


@Component({
  selector: 'app-update-pet-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './update-pet-by-id.component.html',
  styleUrl: './update-pet-by-id.component.css'
})
export class UpdatePetByIdComponent {

  private petService = inject(PetService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public petId: number = 0;

  public formUpdatePet: FormGroup = this.formBuild.group({
    /*
    veterinarian: [''],
    owner: [''],
    */
    identificationCode: [''],
    name: [''],
    description: [''],
    vaccinationData: [''],
    img: [null],
    birthdate: ['', [this.dateValidator]],
    medication: ['']
  })



  findPetById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.petService.findPetById(id).subscribe({
        next: (data: PetResponse) => {
          if (data) {
            this.petId = id;
            this.formUpdatePet.patchValue(data);
          } else {
            console.error("Pet not found!!!");
          }
        },
        error: (err: any) => {
          console.error("Error finding pet: ", err);
        }
      });
    } else {
      console.error("Invalid ID");
    }
  }

  updatePetById() {

    if (this.petId === 0) {
      console.error('No pet ID provided.');
      return;
    }

    console.log('Pet ID:', this.petId);
    console.log('Form value:', this.formUpdatePet.value)

    // Obtener el valor actual de la imagen del formulario
    const currentImg = this.formUpdatePet.value.img;

    // Verificar si la imagen es nula o no tiene un dataUrlImg
    if (currentImg == null) {
      alert("You must add a photo of the pet");
      return;
    } 

    const object : PetRequestUpdate = {
      veterinarian: this.formUpdatePet.value.veterinarian,
      owner: this.formUpdatePet.value.owner,
      identificationCode: this.formUpdatePet.value.identificationCode,
      name: this.formUpdatePet.value.name,
      description: this.formUpdatePet.value.description,
      vaccinationData: this.formUpdatePet.value.vaccinationData,
      img: this.formUpdatePet.value.img.dataUrlImg,
      birthdate: this.formUpdatePet.value.birthdate,
      medication: this.formUpdatePet.value.medication,
    }

    console.log('Attempting to update with object:', object);

    this.petService.updatePetById(this.petId, object).subscribe(
      {
        next: (data) => {
          if (data) {
            this.router.navigate(['/homeApp']);
          } else {
            console.error("Failed to update pet.");
          }
        },
        error: (err: any) => {
          console.error("Error updating pet: ", err);
          alert(`Update error: ${err.message || 'Unknown error'}`);
        }
      });
  }
  
  returnHome() {
    this.router.navigate(['/homeApp']);
  }

  // Método para manejar el cambio de archivo
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.type !== 'image/png') {
        this.formUpdatePet.get('img')?.setErrors({ invalidFormat: true });
        console.log('Invalid image format. Only PNG is allowed.');
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.formUpdatePet.patchValue({ img: { dataUrlImg: reader.result } });
          this.formUpdatePet.get('img')?.setErrors(null); // Limpiar errores si el formato es correcto
          console.log('Image file is valid and has been read successfully.');
        };
        reader.readAsDataURL(file);
      }
    }
  }

    get imgControl() {
      return this.formUpdatePet.get('img');
    }

    // Validator para la fecha de nacimiento
    dateValidator(control: AbstractControl): { [key: string]: any } | null {
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      return dateRegex.test(control.value) ? null : { invalidDate: true };
    }

}
