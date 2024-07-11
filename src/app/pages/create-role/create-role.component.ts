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
import { RoleRequest } from '../../interfaces/role-request';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {

  private roleService = inject(RoleServiceService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formCreateRole = this.formBuild.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  createRole() {
    if (this.formCreateRole.invalid) return;

    const object:RoleRequest = {
      name: this.formCreateRole.value.name ?? '',
      description: this.formCreateRole.value.description ?? ''
    }

    this.roleService.addRole(object).subscribe(
      {
        next: (data) => {
          if (data) {
            alert("Role created successfully.");
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not register.");
          }
        },
        error: (err) => {
          console.log('Create rol error: ', err.message);
          console.log(err);
        }
      })
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
