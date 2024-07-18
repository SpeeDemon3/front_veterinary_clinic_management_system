import { Component, inject } from '@angular/core';
import { RoleServiceService } from '../../services/role-service.service';
import { RoleResponse } from '../../interfaces/role-response';
import { RoleRequest } from '../../interfaces/role-request';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';

@Component({
  selector: 'app-update-role-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './update-role-by-id.component.html',
  styleUrl: './update-role-by-id.component.css'
})
export class UpdateRoleByIdComponent {

  private roleService = inject(RoleServiceService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public roleId: number = 0;

  constructor() { }

  public formUpdateRole: FormGroup = this.formBuild.group({
    name: [''],
    description: ['']
  })

  findRoleById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.roleService.findRoleById(id).subscribe({
        next: (data: RoleResponse) => {
          if (data) {
            this.roleId = id;
            this.formUpdateRole.patchValue(data);
          } else {
            console.error("Role not found!!!");
          }
        },
        error: (err: any) => {
          console.error("Error finding role: ", err);
        }
      });
    } else {
      console.error("Invalid role ID.");
    }
  }

  updateRoleById() {

    if (this.roleId === 0) {
      console.error('No role ID provided.');
      return;
    }

    console.log('User ID:', this.roleId);
    console.log('Form value:', this.formUpdateRole.value)

    const object : RoleRequest = {
      name: this.formUpdateRole.value.name,
      description: this.formUpdateRole.value.description
    }


    console.log('Attempting to update with object:', object);

    this.roleService.updateRoleById(this.roleId, object as RoleRequest).subscribe(
      {
        next: (data) => {
          if (data) {
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not update.");
          }
        },
        error: (err) => {
          console.error('Update error:', err);
          alert(`Update error: ${err.message || 'Unknown error'}`);
        }
      })
    }
  
    returnHome() {
      this.router.navigate(['/homeApp']);
    }

}
