import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../interfaces/appointment-response';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-all-appointment',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, HeaderComponent, NavComponent],
  templateUrl: './find-all-appointment.component.html',
  styleUrl: './find-all-appointment.component.css'
})
export class FindAllAppointmentComponent {

  private appointmentService = inject(AppointmentService);
  public displayedColumns: string[] = ['id', 'dateOfAppointment', 'appointmentTime', 'description', 'veterinarian', 'pet'];
  public appointmentList : AppointmentResponse[] = [];
  
  constructor() {
    this.appointmentService.findAllAppointment().subscribe({
      next:(appointmentData) => {
        if (Array.isArray(appointmentData) && appointmentData.length > 0) {         
          this.appointmentList = appointmentData
        } else {
          console.error('No appointments found or data format incorrect', appointmentData);
        }
      },
      error: (err) => {
        console.log('Find all appointments error: ', err.message);
      }
    })
  }
  

}
