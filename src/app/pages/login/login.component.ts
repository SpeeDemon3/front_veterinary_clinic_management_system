import { Component, inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/login-request';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  login() {
    if (this.formLogin.invalid) return;

    const object : LoginRequest = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    this.accessService.login(object).subscribe({
      next:(data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log(data);
          this.router.navigate(['/homeApp']);
        } else {
          alert("Incorrect credentials.");
        }
    },
    error(err) {
        console.log('Login error: ', err.message);
        alert("Incorrect credentials.");
    },
    })
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}


