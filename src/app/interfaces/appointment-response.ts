import { PetResponse } from "./pet-response";
import { UserResponse } from "./user-response";

export interface AppointmentResponse {
    id : number;
    dateOfAppointment : string;
    appointmentTime : string;
    description : string;
    veterinarian : UserResponse;
    pet : PetResponse;
}
