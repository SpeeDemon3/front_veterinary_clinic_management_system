import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { SignUpRequest } from '../../interfaces/sign-up-request';



import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ImageUploaderComponent } from "../../image-uploader/image-uploader.component";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css',
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule]
})
export class SignUpComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formSignUp: FormGroup = this.formBuild.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    dni: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    img: [null, Validators.required],
    birthdate: ['', Validators.required]
  })

  signUp() {

    if (this.formSignUp.invalid) return;

    const object:SignUpRequest = {
      name: this.formSignUp.value.name,
      email: this.formSignUp.value.email,
      password: this.formSignUp.value.password,
      dni: this.formSignUp.value.dni,
      phoneNumber: this.formSignUp.value.phoneNumber,
      img: this.formSignUp.value.img.dataUrlImg,
      birthdate: this.formSignUp.value.birthdate
    }

    this.accessService.signup(object).subscribe(
      {
        next: (data) => {
          if (data) {
            this.router.navigate(['']);
          } else {
            alert("Could not register.");
          }
        },
        error: (err) => {
          console.log('Sign up error: ', err.message);
          console.log(err);
        }
      })
  }


  returnHome() {
    this.router.navigate(['/']);
  }

    // Método para manejar el cambio de archivo
    onFileChange(event: any) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.type !== 'image/png') {
          this.formSignUp.get('img')?.setErrors({ invalidFormat: true });
        } else {
          this.formSignUp.get('img')?.setErrors(null); // Limpiar errores si el formato es correcto
          this.formSignUp.patchValue({ img: file });
        }
      }
    }

    get imgControl() {
      return this.formSignUp.get('img');
    }
}


