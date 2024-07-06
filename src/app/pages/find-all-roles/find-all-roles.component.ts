import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RoleServiceService } from '../../services/role-service.service';
import { RoleResponse } from '../../interfaces/role-response';
import { NavComponent } from "../nav/nav.component";
import { HeaderComponent } from "../header/header.component";


@Component({
    selector: 'app-find-all-roles',
    standalone: true,
    templateUrl: './find-all-roles.component.html',
    styleUrl: './find-all-roles.component.css',
    imports: [MatCardModule, MatTableModule, CommonModule, NavComponent, HeaderComponent]
})
export class FindAllRolesComponent {

  private roleService = inject(RoleServiceService);
  public roleList: RoleResponse[] = [];
  public displayedColumns: string[] = ['id', 'name', 'description'];

  constructor() {
    this.roleService.findAll().subscribe({
      next:(data) => {
        if (Array.isArray(data) && data.length > 0) {         
          this.roleList = data
        } else {
          console.error('No roles found or data format incorrect', data);
        }
      },
      error: (err) => {
        console.log('Find all roles error: ', err.message);
      }
    })
  }

}
