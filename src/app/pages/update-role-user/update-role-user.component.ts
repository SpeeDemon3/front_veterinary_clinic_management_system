import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user-service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-update-role-user',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, NavComponent, HeaderComponent],
  templateUrl: './update-role-user.component.html',
  styleUrl: './update-role-user.component.css'
})
export class UpdateRoleUserComponent {

  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  updateRoleForm: FormGroup;

  constructor() {
    this.updateRoleForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
      idRole: ['', Validators.required]
    });
  }  

  updateRole() {
    if (this.updateRoleForm.valid) {
      const { dni, idRole } = this.updateRoleForm.value;
      console.log("DNI value: " + dni + " - " + "idRole value: " + idRole);
      this.userService.updateRoleUser(dni, idRole).subscribe({
        next: () => {
          this.snackBar.open('Role updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/homeApp']);
        },
        error: (err: any) => {
          console.error('Update error:', err);
          this.snackBar.open('Failed to update role', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }

}

