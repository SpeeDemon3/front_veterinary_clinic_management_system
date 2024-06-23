import { RoleRequest } from "./role-request";

export interface UserRequestUpdate {
    name : string;
    email : string;
    password : string;
    dni : string;
    phoneNumber : string;
    img : string;
    birthdate : string;
    role : RoleRequest;
}
