import { Location } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentType } from '../data-interfaces/ShipmentType';
import { DataService } from '../service/data-service/data.service';
import { CartComponent } from '../cart/cart.component';



@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css']
})

export class ShipmentPageComponent {
  
  totalPrice:number=0;
  ShippementCost:number=14;
  total: number = 0;

  shipmentTypes:ShipmentType[]=[];

  calculateTotalPrice(): void {
     this.total=this.totalPrice+this.ShippementCost; 
  }
  

  constructor(private router:Router,private dataService:DataService,private route:ActivatedRoute){}
  
  ngOnInit(){
    this.dataService.getShipmentTypes().subscribe(shipmentTypes=>{
      console.log(shipmentTypes);
      this.shipmentTypes=shipmentTypes;
    })
    this.totalPrice=history.state.totalPrice;
    this.calculateTotalPrice(); 

  }

  backtoCart(){
    this.router.navigate(['/cart'])
  }
}
