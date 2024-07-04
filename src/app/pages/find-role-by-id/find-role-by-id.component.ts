import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RoleServiceService } from '../../services/role-service.service';
import { RoleResponse } from '../../interfaces/role-response';

@Component({
  selector: 'app-find-role-by-id',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-role-by-id.component.html',
  styleUrl: './find-role-by-id.component.css'
})
export class FindRoleByIdComponent {

  private roleService = inject(RoleServiceService);
  public displayedColumns: string[] = ['id', 'name', 'description'];
  public dataSource = new MatTableDataSource<RoleResponse>();

  findRoleById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.roleService.findRoleById(id).subscribe({
        next: (data: RoleResponse) => {
          if (data) {
            this.dataSource.data = [data];
          } else {
            console.error("Role not found!!!");
            this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ningún usuario
          }
        },
        error: (err: any) => {
          console.error("Error finding role: ", err);
          this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
        }
      });
    } else {
      console.error("Invalid role ID.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }

}
