import { Component } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

constructor(
  private router : Router
){}

navigateToFindUserById() {
  this.router.navigate(['/findUserById']);
}

navigateToFindUserByDni() {
  this.router.navigate(['/findUserByDni']);
}

navigateToFindAllUser() {
  this.router.navigate(['/findAllUsers']);
}

navigateToFindRoleById() {
  this.router.navigate(['/findRoleById']);
}

navigateToFindAllRoles() {
  this.router.navigate(['/findAllRoles']);
}

navigateToFindAllPets() {
  this.router.navigate(['/findAllPets']);
}

navigateToFindPetById() {
  this.router.navigate(['/findPetById']);
}

navigateToFindPetByCode() {
  this.router.navigate(['/findPetByCode']);
}

navigateToFindOwnerById() {
  this.router.navigate(['/findOwnerById']);
}

navigateToFindOwnerByEmail() {
  this.router.navigate(['/findOwnerByEmail']);
}

navigateToFindOwnerByDni() {
  this.router.navigate(['/findOwnerByDni']);
}

navigateFindAllOwners() {
  this.router.navigate(['/findAllOwners']);
}

navigateToFindInvoiceById() {
  this.router.navigate(['/findInvoiceById']);
}

navigateToFindInvoiceByClientDni() {
  this.router.navigate(['/findByClientDNI']);
}

navigateToFindAllInvoices() {
  this.router.navigate(['/findAllInvoice']);
}

navigateToFindInvoicesByState() {
  this.router.navigate(['/findInvoicesByState']);
}

navigateFindAllAppointment() {
  this.router.navigate(['/findAllAppointment']);
}

navigateToFindAppointmentById() {
  this.router.navigate(['/findAppointmentById']);
}

navigateToFindAppointmentByPetId() {
  this.router.navigate(['/findAppointmentsByPetId']);
}

navigateToFindAppointmentByVeterinarianId() {
  this.router.navigate(['/findAppointmentsByVeterinarianId']);
}


}




