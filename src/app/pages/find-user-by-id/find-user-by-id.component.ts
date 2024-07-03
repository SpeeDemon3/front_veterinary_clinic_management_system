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

  private userService = inject(UserService)
  user : UserResponse | undefined;
  public displayedColumns: string[] = ['id', 'name', 'email', 'dni', 'phoneNumber', 'birthdate', 'img'];
  public dataSource = new MatTableDataSource<UserResponse>();

  constructor() {

  }

  findUserById(id : number) {
    this.userService.findUserById(id).subscribe({
      next:(data : UserResponse) => {
        if (data.id > 0) {
          this.dataSource.data = [data];
        } else {
          console.error("User not found!!!");
        }
      },
      error: (err : any) => {
        console.error("User not found: ", err)
        this.dataSource.data = []; // Clear the table data if there's an error
      }
    })
  }


}
