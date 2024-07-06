import { Component, inject } from '@angular/core';
import { OwnerResponse } from '../../interfaces/owner-response';
import { OwnerService } from '../../services/owner.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";

@Component({
    selector: 'app-find-all-owner',
    standalone: true,
    templateUrl: './find-all-owner.component.html',
    styleUrl: './find-all-owner.component.css',
    imports: [MatCardModule, MatTableModule, CommonModule, HeaderComponent, NavComponent]
})
export class FindAllOwnerComponent {

  private ownerService = inject(OwnerService);
  public displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'dni', 'phoneNumber'];
  public ownerList: OwnerResponse[] = [];
  
  constructor() {
    this.ownerService.findAll().subscribe({
      next:(ownerData) => {
        if (Array.isArray(ownerData) && ownerData.length > 0) {         
          this.ownerList = ownerData
        } else {
          console.error('No owners found or data format incorrect', ownerData);
        }
      },
      error: (err) => {
        console.log('Find all owners error: ', err.message);
      }
    })
  }

}
