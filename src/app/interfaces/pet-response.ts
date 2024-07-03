import { UserRequest } from "./user-request";

export interface PetResponse {
    veterinarian : UserRequest;
    identificationCode : string;
    name : string;
    description : string;
    vaccinationData : string;
    img : string;
    birthdate : string;
    medication : string;
}
