import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentRequestUpdate } from '../../interfaces/appointment-request-update';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { AppointmentResponse } from '../../interfaces/appointment-response';

@Component({
  selector: 'app-update-appointment-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule],
  templateUrl: './update-appointment-by-id.component.html',
  styleUrl: './update-appointment-by-id.component.css'
})
export class UpdateAppointmentByIdComponent {

  private appointmentService = inject(AppointmentService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public appointmentId: number = 0;

  constructor() { };

  public formUpdateAppointment: FormGroup = this.formBuild.group({
    dateOfAppointment: [''],
    appointmentTime: [''],
    description: ['']
  });

  findAppointmentById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.appointmentService.findAppointmentById(id).subscribe({
        next: (data: AppointmentResponse) => {
          console.log(data);
          if (data) {
            this.appointmentId = id;
            this.formUpdateAppointment.patchValue(data);
            console.log(data);
          } else {
            console.log("No appointment found with id: " + id);
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      console.log("Invalid id: " + idString);
    }
  }

  updateAppointmentById() {

    if (this.appointmentId === 0) {
      console.error('No appointment ID provided.');
      return;
    }

    console.log('Appointment ID:', this.appointmentId);
    console.log('Form value:', this.formUpdateAppointment.value)

    const object : AppointmentRequestUpdate = {
      dateOfAppointment: this.formUpdateAppointment.value.dateOfAppointment,
      appointmentTime: this.formUpdateAppointment.value.appointmentTime,
      description: this.formUpdateAppointment.value.description,
      veterinarian: this.formUpdateAppointment.value.veterinarian,
      pet: this.formUpdateAppointment.value.pet
    }

    console.log('Attempting to update with object:', object);

    this.appointmentService.updateAppointmentById(this.appointmentId, object as AppointmentRequestUpdate).subscribe(
      {
        next: (data: any) => {
          if (data) {
            this.router.navigate(['/homeApp']);
          } else {
            alert("Could not update.");
          }
        },
        error: (err: any) => {
          console.error('Update error:', err);
          alert(`Update error: ${err.message || 'Unknown error'}`);
        }
      });
  }
 
  returnHome() {
    this.router.navigate(['/homeApp']);
  }

}
