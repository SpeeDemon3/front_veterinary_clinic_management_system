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

// Funcion para que cuando se hace click en un button me lleve a otro lugar
navigateToAdminManagement() {
  this.router.navigate(['/adminManagement'])
}

}
