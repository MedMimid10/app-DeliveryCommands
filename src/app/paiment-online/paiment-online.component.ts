import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data-service/data.service';

declare var $: any;
@Component({
  selector: 'app-paiment-online',
  templateUrl: './paiment-online.component.html',
  styleUrls: ['./paiment-online.component.css']
})
export class PaimentOnlineComponent {
  constructor(private router:Router,private dataService:DataService){}

  activeTab: string = 'credit-card';


  onSelectTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {

    this.dataService.createShipment(this.dataService.bodyToSend).subscribe(response=>{
      console.log(response);
    });
    this.dataService.bodyToSend={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",status:"",shipmentType:"",products:[],paiement:{}};

  }
  cancelPayment(){
    this.router.navigate(['/shippement-page'])
  }
}
