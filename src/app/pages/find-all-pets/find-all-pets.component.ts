import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PetService } from '../../services/pet.service';
import { PetResponse } from '../../interfaces/pet-response';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";

@Component({
    selector: 'app-find-all-pets',
    standalone: true,
    templateUrl: './find-all-pets.component.html',
    styleUrl: './find-all-pets.component.css',
    imports: [MatCardModule, MatTableModule, CommonModule, HeaderComponent, NavComponent]
})
export class FindAllPetsComponent {

  private petService = inject(PetService);
  public petList : PetResponse[] = [];
  public displayedColumns: string[] = ['id', 'identificationCode', 'veterinarian', 'name', 'description', 'vaccinationData', 'img', 'birthdate', 'medication'];

  constructor() {
    this.petService.findAllPets().subscribe({
      next:(data) => {
        if (Array.isArray(data) && data.length > 0) {         
          this.petList = data
        } else {
          console.error('No pets found or data format incorrect', data);
        }
      },
      error: (err) => {
        console.log('Find all pets error: ', err.message);
      }
    })
  }

}
