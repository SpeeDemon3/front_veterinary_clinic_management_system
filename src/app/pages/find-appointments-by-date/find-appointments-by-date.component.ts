import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { AppointmentResponse } from '../../interfaces/appointment-response';
import { AppointmentService } from '../../services/appointment.service';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-appointments-by-date',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-appointments-by-date.component.html',
  styleUrl: './find-appointments-by-date.component.css'
})
export class FindAppointmentsByDateComponent {

  private appointmentService = inject(AppointmentService);
  public displayedColumns: string[] = ['id', 'dateOfAppointment', 'appointmentTime', 'description', 'veterinarian', 'pet'];
  public dataSource = new MatTableDataSource<AppointmentResponse>();

  constructor() {}

  
  validateAndFindAppointmentsByDate(date: string) {
    if (this.isValidDate(date)) {
      this.findAppointmentsByDate(date);
    } else {
      console.error("Invalid date format");
      this.dataSource.data = []; // Limpiar los datos de la tabla si la fecha no es válida
    }
  }

  isValidDate(date: string): boolean {
    // Validar formato de fecha dd-mm-yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(date);
  }

  findAppointmentsByDate(date: string) {
    this.appointmentService.findAppointmentsByDate(date).subscribe({
      next: (appointmentData: AppointmentResponse[]) => {
        if (Array.isArray(appointmentData) && appointmentData.length > 0) {
          this.dataSource.data = appointmentData;
        } else {
          console.error("Appointments not found!!!");
          this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ninguna cita
        }
      },
      error: (err: any) => {
        console.error("Error finding appointments: ", err);
        this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
      }
    });
  }
    

  /*
  findAppointmentsByDate(date: string) {
    console.log(date);
    if (date.trim() !== '') {
      this.appointmentService.findAppointmentsByDate(date).subscribe({
        next: (appointmentData: AppointmentResponse[]) => {
          if (Array.isArray(appointmentData) && appointmentData.length > 0) {
            this.dataSource.data = appointmentData;
          } else {
            console.error("Appointments not found!!!");
            this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ninguna cita
          }
        },
        error: (err: any) => {
          console.error("Error finding appointments: ", err);
          this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
        }
      });
    } else {
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es un número válido
    }
  }  
  */
  

}
