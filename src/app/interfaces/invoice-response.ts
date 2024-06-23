import { OwnerResponse } from "./owner-response";

export interface InvoiceResponse {
    id : number;
    invoiceNumber : string;
    totalPrice : number;
    client : OwnerResponse;
    dateOfIssue : Date;
    state : string;
}
