import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { AppointmentRequest } from '../../interfaces/appointment-request';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {

  private appointmentService = inject(AppointmentService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formCreateAppointment = this.formBuild.group({
    idVeterinarian: ['', Validators.required],
    idPet: ['', Validators.required],
    dateOfAppointment: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
    appointmentTime: ['', Validators.required],
    description: ['', Validators.required]
  });

  createAppointment() {
    if (this.formCreateAppointment.invalid) return;

    const object: AppointmentRequest = {
      dateOfAppointment: this.formCreateAppointment.value.dateOfAppointment ?? '',
      appointmentTime: this.formCreateAppointment.value.appointmentTime ?? '',
      description: this.formCreateAppointment.value.description ?? ''
    };

    const idVeterinarian = Number(this.formCreateAppointment.value.idVeterinarian);
    const idPet = Number(this.formCreateAppointment.value.idPet);

    this.appointmentService.createAppointment(idVeterinarian, idPet, object).subscribe(
      {
        next: (data) => {
          if (data) {
            alert("Appointment created successfully.");
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not register.");
          }
        },
        error: (err) => {
          console.log('Create appointment error: ', err.message);
          console.log(err);
        }
      })
  }

  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
