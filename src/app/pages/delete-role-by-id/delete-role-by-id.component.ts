import { Component, inject } from '@angular/core';
import { RoleServiceService } from '../../services/role-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-delete-role-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './delete-role-by-id.component.html',
  styleUrl: './delete-role-by-id.component.css'
})
export class DeleteRoleByIdComponent {

  private roleService = inject(RoleServiceService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formDeleteRoleById = this.formBuild.group({
    id: ['', [Validators.required]]
  })

  deleteRoleById() {
    if (this.formDeleteRoleById.invalid) return;

    const idRole : number = Number(this.formDeleteRoleById.value.id);  
    console.log("Value role id: " + idRole);

    if (isNaN(idRole)) {
      alert("Invalid role ID");
      return;
    }

    this.roleService.deleteRoleById(idRole).subscribe(
      (response) => {
        alert("Role deleted successfully");
        this.router.navigate(['/findAllRoles']);
      },
      (error) => {
        alert("Error deleting role");
      }
    )
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
