import { Component } from '@angular/core';
import { DataService } from '../service/data-service/data.service';
import { Shipment } from '../data-interfaces/Shipment';

@Component({
  selector: 'app-trafic-orders',
  templateUrl: './trafic-orders.component.html',
  styleUrls: ['./trafic-orders.component.css']
})
export class TraficOrdersComponent {
  code:string="";
  shipment:Shipment={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",orderDate:"",status:"",shipmentType: {code:"",name:"",description:"",price:0}};
  
  constructor(private dataService:DataService){}
  
  
  getShipment(){
    console.log(this.code)
    if(this.code.length !== 0){
      this.dataService.getShipment(this.code).subscribe(shipment=>{
        if(shipment !== null){
          this.shipment=shipment;
          console.log(shipment)
        }else{
          this.shipment={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",orderDate:"",status:"",shipmentType: {code:"",name:"",description:"",price:0}};
        }
      })
    }else{
      this.shipment={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",orderDate:"",status:"",shipmentType: {code:"",name:"",description:"",price:0}};
    }
  }
}
