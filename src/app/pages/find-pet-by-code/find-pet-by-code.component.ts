import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { PetService } from '../../services/pet.service';
import { PetResponse } from '../../interfaces/pet-response';

@Component({
  selector: 'app-find-pet-by-code',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-pet-by-code.component.html',
  styleUrl: './find-pet-by-code.component.css'
})
export class FindPetByCodeComponent {
  
  private petService = inject(PetService)
  public displayedColumns: string[] = ['identificationCode', 'name', 'description', 'vaccinationData', 'img', 'birthdate', 'medication'];
  public dataSource = new MatTableDataSource<PetResponse>();

  findPetByCode(code: string) {
    console.log(code);
    if (code.trim().length > 0) {
      this.petService.findByCode(code).subscribe({
        next: (data: PetResponse) => {
          if (data) {
            this.dataSource.data = [data];
            console.log(data);
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
      console.error("Invalid pet code.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }
  
}
