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
  this.router.navigate(['/findAll']);
}

navigateToFindRoleById() {
  this.router.navigate(['/findRoleById']);
}



}
