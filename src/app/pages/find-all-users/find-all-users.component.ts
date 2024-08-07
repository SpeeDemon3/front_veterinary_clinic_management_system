import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";


@Component({
    selector: 'app-find-all-users',
    standalone: true,
    templateUrl: './find-all-users.component.html',
    styleUrl: './find-all-users.component.css',
    imports: [MatCardModule, MatTableModule, CommonModule, HeaderComponent, NavComponent]
})

export class FindAllUsersComponent {

  private userService = inject(UserService);
  public userList : UserResponse[] = [];
  public displayedColumns: string[] = ['id', 'name', 'email', 'dni', 'phoneNumber', 'img', 'birthdate', 'pets'];

  constructor() {
    this.userService.findAll().subscribe({
      next:(data) => {
        if (Array.isArray(data) && data.length > 0) {         
          this.userList = data
        } else {
          console.error('No users found or data format incorrect', data);
        }
      },
      error: (err) => {
        console.log('Find all users error: ', err.message);
      }
    })
  }

}
