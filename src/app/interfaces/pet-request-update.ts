import { UserRequestUpdate } from "./user-request-update";

export interface PetRequestUpdate {
    veterinarian : UserRequestUpdate;
    identificationCode : string;
    name : string;
    description : string;
    vaccinationData : string;
    img : string;
    birthdate : string;
    medication : string;
}
