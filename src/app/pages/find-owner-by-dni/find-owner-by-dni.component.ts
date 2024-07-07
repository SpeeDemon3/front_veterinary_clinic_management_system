import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OwnerResponse } from '../../interfaces/owner-response';
import { OwnerService } from '../../services/owner.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-owner-by-dni',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-owner-by-dni.component.html',
  styleUrl: './find-owner-by-dni.component.css'
})
export class FindOwnerByDniComponent {

  private ownerService = inject(OwnerService);
  public displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'dni', 'phoneNumber', 'pets', 'invoices'];
  public dataSource = new MatTableDataSource<OwnerResponse>();

  findOwnerByDni(dni: string) {
    console.log(dni);
    if (dni.length === 9) {
      this.ownerService.findOwnerByDni(dni).subscribe({
        next: (ownerData: OwnerResponse) => {
          if (ownerData) {
            this.dataSource.data = [ownerData];
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
      console.error("Invalid owner DNI.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }

}
