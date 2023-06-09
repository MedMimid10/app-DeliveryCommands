import { Location } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentType } from '../data-interfaces/ShipmentType';
import { DataService } from '../service/data-service/data.service';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../data-interfaces/Product';



@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css']
})

export class ShipmentPageComponent {
  
  totalPrice:number=0;
  ShippementCost:number=14;
  total: number = 0;
  products:Product[]=[];

  firstname:string="";

  shipmentTypes:ShipmentType[]=[];
  shipmentSelectedCode:string="S-001";

  calculateTotalPrice(): void {
     this.total=this.totalPrice+this.ShippementCost; 
  }
  

  constructor(private router:Router,private dataService:DataService,private route:ActivatedRoute){}
  
  ngOnInit(){
    this.dataService.getShipmentTypes().subscribe(shipmentTypes=>{
      // console.log(shipmentTypes);
      this.shipmentTypes=shipmentTypes;
    })
    if(!history.state.totalPrice || !history.state.products){
      this.router.navigate(['/']);
    }else{
      this.totalPrice=history.state.totalPrice;
      this.products=history.state.products;

      this.products.forEach(product => {
        this.dataService.bodyToSend.products.push({id:product.id,quantity:product.quantity});
      });

      this.calculateTotalPrice(); 
    }

  }

  submitShipment(){
    // console.log(this.firstname);
    if(this.firstname.length===0){
      console.log("fill all form fields");
    }else{
      this.dataService.bodyToSend.fname=this.firstname;
      console.log(this.dataService.bodyToSend);
      
      

      this.router.navigate(['/paiement-online']);
    }
  }

  selectShipment(code:any){
    this.shipmentSelectedCode=code;
    console.log("selected shipment code :",this.shipmentSelectedCode);
  }

  backtoCart(){
    this.dataService.bodyToSend={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",email:"",status:"",shipmentType:0,products:[],paiement:{}};
    this.router.navigate(['/cart'])
  }
}
