import { OwnerRequest } from "./owner-request";
import { UserRequest } from "./user-request";

export interface PetResponse {
    id : number;
    veterinarian : UserRequest;
    owner :  OwnerRequest;
    identificationCode : string;
    name : string;
    description : string;
    vaccinationData : string;
    img : string;
    birthdate : string;
    medication : string;
}
