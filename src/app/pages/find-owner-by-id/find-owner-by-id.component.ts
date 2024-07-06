import { Component, inject } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { OwnerResponse } from '../../interfaces/owner-response';

@Component({
  selector: 'app-find-owner-by-id',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-owner-by-id.component.html',
  styleUrl: './find-owner-by-id.component.css'
})
export class FindOwnerByIdComponent {

  private ownerService = inject(OwnerService);
  public displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'dni', 'phoneNumber'];
  public dataSource = new MatTableDataSource<OwnerResponse>();

  constructor() {}

  findOwnerById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.ownerService.findById(id).subscribe({
        next: (data: OwnerResponse) => {
          if (data) {
            this.dataSource.data = [data];
          } else {
            console.error("Owner not found!!!");
            this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ningún usuario
          }
        },
        error: (err: any) => {
          console.error("Error finding owner: ", err);
          this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
        }
      });
    } else {
      console.error("Invalid owner ID.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }

}
