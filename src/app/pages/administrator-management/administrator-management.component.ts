import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";

import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-administrator-management',
    standalone: true,
    templateUrl: './administrator-management.component.html',
    styleUrl: './administrator-management.component.css',
    imports: [RouterLinkActive, HeaderComponent, NavComponent, MatTabsModule]
})
export class AdministratorManagementComponent {

}
