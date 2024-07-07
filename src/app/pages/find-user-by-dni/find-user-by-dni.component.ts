import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-find-user-by-dni',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-user-by-dni.component.html',
  styleUrl: './find-user-by-dni.component.css'
})
export class FindUserByDniComponent {

  
  private userService = inject(UserService)
  public displayedColumns: string[] = ['id', 'name', 'email', 'dni', 'phoneNumber', 'birthdate', 'pets', 'img'];
  public dataSource = new MatTableDataSource<UserResponse>();

  findUserByDni(dni: string) {
    console.log(dni);
    if (dni.length === 9) {
      this.userService.findByDni(dni).subscribe({
        next: (data: UserResponse) => {
          if (data) {
            this.dataSource.data = [data];
          } else {
            console.error("User not found!!!");
            this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ningún usuario
          }
        },
        error: (err: any) => {
          console.error("Error finding user: ", err);
          this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
        }
      });
    } else {
      console.error("Invalid user DNI.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }
  

}
