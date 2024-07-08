import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../interfaces/appointment-response';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-appointments-by-pet-id',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-appointments-by-pet-id.component.html',
  styleUrl: './find-appointments-by-pet-id.component.css'
})
export class FindAppointmentsByPetIdComponent {

  private appointmentService = inject(AppointmentService);
  public displayedColumns: string[] = ['id', 'dateOfAppointment', 'appointmentTime', 'description', 'veterinarian', 'pet'];
  public dataSource = new MatTableDataSource<AppointmentResponse>();

  constructor() { }

  findAppointmentsByPetId(id: string) {
    const petId = Number(id);
    if (!isNaN(petId)) {
      this.appointmentService.findAppointmentsByPetId(petId).subscribe({
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
  

}
