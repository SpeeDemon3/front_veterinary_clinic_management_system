import { PetResponse } from "./pet-response";
import { RoleResponse } from "./role-response";

export interface UserResponse {
    value: UserResponse[];
    id : number;
    name : string;
    email : string;
    password : string;
    dni : string;
    phoneNumber : string;
    img : string;
    birthdate : string;
    role : RoleResponse;
    notifications : Notification[];
    pets : PetResponse[];
}
