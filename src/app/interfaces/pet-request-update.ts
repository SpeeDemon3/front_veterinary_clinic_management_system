import { OwnerRequest } from "./owner-request";
import { OwnerResponse } from "./owner-response";
import { UserRequestUpdate } from "./user-request-update";

export interface PetRequestUpdate {
    veterinarian : UserRequestUpdate;
    owner: OwnerRequest;
    identificationCode : string;
    name : string;
    description : string;
    vaccinationData : string;
    img : string;
    birthdate : string;
    medication : string;
}
