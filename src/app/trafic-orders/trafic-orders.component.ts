import { Component } from '@angular/core';
import { DataService } from '../service/data-service/data.service';

@Component({
  selector: 'app-trafic-orders',
  templateUrl: './trafic-orders.component.html',
  styleUrls: ['./trafic-orders.component.css']
})
export class TraficOrdersComponent {
  code:string="";

  constructor(private dataService:DataService){}
  ngOnInit(){
    this.dataService.getShipment("001").subscribe(shipment=>{
      console.log(shipment)
    })
  }
  getShipment(){
    console.log(this.code)
    this.dataService.getShipment(this.code).subscribe(shipment=>{
      console.log(shipment)
    })
  }
}
