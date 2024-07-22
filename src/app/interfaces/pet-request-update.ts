import { OwnerRequest } from "./owner-request";
import { OwnerResponse } from "./owner-response";
import { UserRequestUpdate } from "./user-request-update";
import { UserResponse } from "./user-response";

export interface PetRequestUpdate {
    veterinarian : UserResponse;
    owner: UserResponse;
    identificationCode : string;
    name : string;
    description : string;
    vaccinationData : string;
    img : string;
    birthdate : string;
    medication : string;
}
