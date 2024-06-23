import { PetRequestUpdate } from "./pet-request-update";
import { UserRequestUpdate } from "./user-request-update";

export interface AppointmentRequestUpdate {
    dateOfAppointment : string;
    appointmentTime : string;
    description : string;
    veterinarian : UserRequestUpdate;
    pet : PetRequestUpdate;
}
