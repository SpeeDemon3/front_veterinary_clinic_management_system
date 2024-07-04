import { Component, inject } from '@angular/core';
import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user-service';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-find-user-by-id',
    standalone: true,
    templateUrl: './find-user-by-id.component.html',
    styleUrl: './find-user-by-id.component.css',
    imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule]
})
export class FindUserByIDComponent {

  private userService = inject(UserService);
  public displayedColumns: string[] = ['id', 'name', 'email', 'dni', 'phoneNumber', 'birthdate', 'img'];
  public dataSource = new MatTableDataSource<UserResponse>();

  constructor() {

  }

  findUserById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.userService.findUserById(id).subscribe({
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
      console.error("Invalid user ID.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }


}
