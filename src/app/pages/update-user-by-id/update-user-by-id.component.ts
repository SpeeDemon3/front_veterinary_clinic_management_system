import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { UserRequestUpdate } from '../../interfaces/user-request-update';
import { UserResponse } from '../../interfaces/user-response';

@Component({
  selector: 'app-update-user-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './update-user-by-id.component.html',
  styleUrl: './update-user-by-id.component.css'
})
export class UpdateUserByIdComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public userId: number = 0;

  constructor(){}

  public formUpdateUser: FormGroup = this.formBuild.group({
    name: [''],
    email: ['', [Validators.email]],
    password: [''],
    dni: ['', [Validators.pattern(/^\d{8}[A-Z]$/)]],
    phoneNumber: ['', Validators.required],
    img: [null],
    birthdate: ['', [this.dateValidator]]
  })

  findUserById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.userService.findUserById(id).subscribe({
        next: (data: UserResponse) => {
          if (data) {
            this.userId = id;
            this.formUpdateUser.patchValue(data);
          } else {
            console.error("User not found!!!");
          }
        },
        error: (err: any) => {
          console.error("Error finding user: ", err);
        }
      });
    } else {
      console.error("Invalid user ID.");
    }
  }

  updateUserById() {

    if (this.userId === 0) {
      console.error('No user ID provided.');
      return;
    }

    console.log('User ID:', this.userId);
    console.log('Form value:', this.formUpdateUser.value)

    const object:UserRequestUpdate = {
      name: this.formUpdateUser.value.name,
      email: this.formUpdateUser.value.email,
      password: this.formUpdateUser.value.password,
      dni: this.formUpdateUser.value.dni,
      phoneNumber: this.formUpdateUser.value.phoneNumber,
      img: this.formUpdateUser.value.img.dataUrlImg,
      birthdate: this.formUpdateUser.value.birthdate,
    }

    console.log('Attempting to update with object:', object);

    this.userService.updateById(this.userId, object as UserRequestUpdate).subscribe(
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
      });
  }
  
  returnHome() {
    this.router.navigate(['/homeApp']);
  }

  // Método para manejar el cambio de archivo
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.type !== 'image/png') {
        this.formUpdateUser.get('img')?.setErrors({ invalidFormat: true });
        console.log('Invalid image format. Only PNG is allowed.');
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.formUpdateUser.patchValue({ img: { dataUrlImg: reader.result } });
          this.formUpdateUser.get('img')?.setErrors(null); // Limpiar errores si el formato es correcto
          console.log('Image file is valid and has been read successfully.');
        };
        reader.readAsDataURL(file);
      }
    }
  }

    get imgControl() {
      return this.formUpdateUser.get('img');
    }

    // Validator para la fecha de nacimiento
    dateValidator(control: AbstractControl): { [key: string]: any } | null {
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      return dateRegex.test(control.value) ? null : { invalidDate: true };
    }

}
