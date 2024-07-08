import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentResponse } from '../../interfaces/appointment-response';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-find-appointment-by-id',
  standalone: true,
  imports: [HeaderComponent, NavComponent, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './find-appointment-by-id.component.html',
  styleUrl: './find-appointment-by-id.component.css'
})
export class FindAppointmentByIdComponent {

  private appointmentService = inject(AppointmentService);
  public displayedColumns: string[] = ['id', 'dateOfAppointment', 'appointmentTime', 'description', 'veterinarian', 'pet'];
  public dataSource = new MatTableDataSource<AppointmentResponse>();

  constructor() {}

  findInvoiceById(idString: string) {
    const id = parseInt(idString);
    console.log(id);
    if (!isNaN(id) && id > 0) {
      this.appointmentService.findAppointmentById(id).subscribe({
        next: (appointmentData: AppointmentResponse) => {
          if (appointmentData) {
            this.dataSource.data = [appointmentData];
          } else {
            console.error("Appointment not found!!!");
            this.dataSource.data = []; // Limpiar los datos de la tabla si no se encontró ningún usuario
          }
        },
        error: (err: any) => {
          console.error("Error finding appointment: ", err);
          this.dataSource.data = []; // Limpiar los datos de la tabla en caso de error
        }
      });
    } else {
      console.error("Invalid appointment ID.");
      this.dataSource.data = []; // Limpiar los datos de la tabla si el ID no es válido
    }
  }

}
