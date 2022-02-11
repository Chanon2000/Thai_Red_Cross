import { Role } from "./role";

export class User {
    Employee_ID?:number;
    Username?:string;
    Password?:string;
    firstName?:string;
    lastName?:string;
    sex?:number;
    Age?:number;
    Address?:string;
    PhoneNumber?:string;
    Type_ID?:Role;
    StartDate?:string;
}
