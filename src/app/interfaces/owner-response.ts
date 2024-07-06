import { InvoiceResponse } from "./invoice-response";
import { PetResponse } from "./pet-response";

export interface OwnerResponse {
    id : number;
    name : string;
    lastName : string;
    email : string;
    dni : string;
    phoneNumber : string;
    pets : PetResponse[];
    invoices : InvoiceResponse[];
}
