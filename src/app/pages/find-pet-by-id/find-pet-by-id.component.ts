import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { PetService } from '../../services/pet.service';
import { PetResponse } from '../../interfaces/pet-response';

@Component({
  selector: 'app-find-pet-by-id',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-pet-by-id.component.html',
  styleUrl: './find-pet-by-id.component.css'
})
export class FindPetByIdComponent {

private petService = inject(PetService);
public displayedColumns: string[] = ['identificationCode', 'name', 'description', 'vaccinationData', 'img', 'birthdate', 'medication'];
public dataSource = new MatTableDataSource<PetResponse>();

constructor() {}

findPetById(idString: string) {
  const id = parseInt(idString);
  console.log(id);
  if (!isNaN(id) && id > 0) {
    this.petService.findPetById(id).subscribe({
      next: (data: PetResponse) => {
        if (data) {
          this.dataSource.data = [data];
        } else {
          console.error("Pet not found!!!");
          this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ningún usuario
        }
      },
      error: (err: any) => {
        console.error("Error finding pet: ", err);
        this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
      }
    });
  } else {
    console.error("Invalid pet ID.");
    this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
  }
}

}
