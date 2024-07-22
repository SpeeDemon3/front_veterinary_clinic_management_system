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

navigateToLogin() {
  this.router.navigate(['/']);
}

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

navigateToFindAppointmentByState() {
  this.router.navigate(['/findAppointmentsByDate']);
}

navigateToCreatePet() {
  this.router.navigate(['/createPet']);
}

navigateToCreateOwner() {
  this.router.navigate(['/createOwner']);
}

navigateToCreateInvoice() {
  this.router.navigate(['/createInvoice']);
}

navigateToCreateAppointment() {
  this.router.navigate(['/createAppointment']);
}

navigateToCreateRole() {
  this.router.navigate(['/createRole']);
}

navigateToDeleleteUserById() {
  this.router.navigate(['/deleteUserById']);
}

navigateToDeleletePetById() {
  this.router.navigate(['/deletePetById']);
}

navigateToDeleteInvoiceById() {
  this.router.navigate(['/deleteInvoiceById']);
}

navigateToDeleteRoleById() {
  this.router.navigate(['/deleteRoleById']);
}

navigateToDeleteAppointmentById() {
  this.router.navigate(['/deleteAppointmentById']);
}

navigateToDeleteOwnerById() {
  this.router.navigate(['/deleteOwnerById'])
}

navigateToUpdateUserById() {
  this.router.navigate(['/updateUserById']);
}

navigateToUpdateRoleByID() {
  this.router.navigate(['/updateRoleById']);
}

navigateToUpdateOwnerById() {
  this.router.navigate(['/updateOwnerById']);
}

navigateToUpdatePetById() {
  this.router.navigate(['/updatePetById']);
}

navigateToUpdateInvoiceById() {
  this.router.navigate(['/updateInvoiceById']);
}





}




