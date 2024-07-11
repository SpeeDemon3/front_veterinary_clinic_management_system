import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../image-uploader/image-uploader.component';
import { AppointmentService } from '../../services/appointment.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-delete-appointment-by-id',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ImageUploaderComponent, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './delete-appointment-by-id.component.html',
  styleUrl: './delete-appointment-by-id.component.css'
})
export class DeleteAppointmentByIdComponent {

  private appointmentService = inject(AppointmentService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)

  public formDeleteAppointmentById = this.formBuilder.group({
    id: ['', [Validators.required]]
  })

  deleteAppointmentById() {
    if (this.formDeleteAppointmentById.invalid) return;

    const idAppointment : number = Number(this.formDeleteAppointmentById.value.id);  

    if (isNaN(idAppointment)) {
      alert("Invalid appointment ID");
      return;
    }

    this.appointmentService.deleteAppointmentById(idAppointment).subscribe({
      next: (response: any) => {
        console.log('Response received from deleteById:', response);
        console.log(response)
        this.router.navigate(['/findAllAppointment'])
      },
      error: (error) => {
        console.error("Delete appointment error: ", error);
        alert(`Error: ${'An error occurred while trying to delete the appointment.'}`)
      }
    });

  }

returnHome() {
  this.router.navigate(['/homeApp']);
}
  

}
