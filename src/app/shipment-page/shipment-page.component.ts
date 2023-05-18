import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css']
})
export class ShipmentPageComponent {
  constructor(private router:Router){}

  backtoCart(){
    this.router.navigate(['/cart'])
  }
}
