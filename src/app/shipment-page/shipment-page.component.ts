import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentType } from '../data-interfaces/ShipmentType';
import { DataService } from '../service/data-service/data.service';

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css']
})
export class ShipmentPageComponent {
  shipmentTypes:ShipmentType[]=[];

  constructor(private router:Router,private dataService:DataService){}
  
  ngOnInit(){
    this.dataService.getShipmentTypes().subscribe(shipmentTypes=>{
      console.log(shipmentTypes);
      this.shipmentTypes=shipmentTypes;
    })
  }

  backtoCart(){
    this.router.navigate(['/cart'])
  }
}
