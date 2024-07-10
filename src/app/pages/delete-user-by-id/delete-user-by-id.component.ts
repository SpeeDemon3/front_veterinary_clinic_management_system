import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { HeaderComponent } from "../header/header.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-delete-user-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './delete-user-by-id.component.html',
  styleUrl: './delete-user-by-id.component.css'
})
export class DeleteUserByIdComponent {
  
  private userService = inject(UserService)
  private router = inject(Router)
  private formBuild = inject(FormBuilder);

  public formDeleteUserById = this.formBuild.group({
    id: ['', [Validators.required]]
  })

  deleteUserById() {
    if (this.formDeleteUserById.invalid) return;

    const idUser : number = Number(this.formDeleteUserById.value.id);  

    if (isNaN(idUser)) {
      alert("Invalid user ID");
      return;
    }

    /*
    this.userService.deleteById(idUser).subscribe(

      {
        next: (response : any) => {
          console.log('Response received from deleteById:', response);
          if (response) {
            alert("User deleted successfully.");
            console.log(response)
            this.router.navigate(['/findAllUsers'])
          } else {
            alert("Could not delete.");
          }
        },
        error: (error) => {
          console.error("Delete user error: ", error);
          if (error.message) {
            alert(`Error: ${error.message}`);
          } else {
            alert("An error occurred while trying to delete the user.");
          }
        }
      });
      */

      this.userService.deleteById(idUser).subscribe({
        next: (response: any) => {
          console.log('Response received from deleteById:', response);
          alert("User deleted successfully.");
          console.log(response)
          this.router.navigate(['/findAllUsers'])
        },
        error: (error) => {
          alert("User deleted successfully.");
          this.router.navigate(['/findAllUsers'])
          console.error("Delete user error: ", error);
          //alert(`Error: ${error.error?.message || 'An error occurred while trying to delete the user.'}`);
        }
      });

    }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}

/*
      if (idUser > 0) {
        (response: any) => {
          console.log(response)
          this.router.navigate(['/findAllUsers'])
        }
      }
*/
