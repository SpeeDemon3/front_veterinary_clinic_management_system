import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OwnerResponse } from '../../interfaces/owner-response';
import { OwnerService } from '../../services/owner.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-owner-by-email',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-owner-by-email.component.html',
  styleUrl: './find-owner-by-email.component.css'
})
export class FindOwnerByEmailComponent {

  private ownerService = inject(OwnerService);
  public displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'dni', 'phoneNumber'];
  public dataSource = new MatTableDataSource<OwnerResponse>();

  constructor() {}

  findOwnerByEmail(email: string) {
    console.log(email);
    if (email.trim() !== '') {
      this.ownerService.findByEmail(email).subscribe({
        next: (ownerData: OwnerResponse) => {
          console.log('Owner found:', ownerData);
          if (ownerData) {
            this.dataSource.data = [ownerData];
            console.log(ownerData);
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
      console.error("Invalid owner code.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }  
  
}
