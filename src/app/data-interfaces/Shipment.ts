import { ShipmentType } from "./ShipmentType";
export interface Shipment{
    code:string,
    fname:string,
    lname:string,
    tel:string,
    address:string,
    city:string,
    postalCode:string,
    zip:string,
    email:string,
    orderDate:string,
    status:string,
    shipmentType: ShipmentType
}