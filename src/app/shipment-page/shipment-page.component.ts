import { Location } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentType } from '../data-interfaces/ShipmentType';
import { DataService } from '../service/data-service/data.service';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../data-interfaces/Product';
import { PaiementDto } from '../data-interfaces/paiemetDto';



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
  lastname:string="";
  telephone:string="";
  address:string="";
  city:string="";
  postalCode:string="";
  zip:string="";
  orderDate:string="";
  status:string="";
  email:string="";

  shipmentTypes:ShipmentType[]=[];
  shipmentSelectedCode:string="S-001";


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
  calculateTotalPrice(): void {
    this.total=this.totalPrice+this.ShippementCost;
 }


 submitShipment() {
  if (this.firstname.length === 0 ||
      this.lastname.length === 0 ||
      this.telephone.length === 0 ||
      this.address.length === 0 ||
      this.city.length === 0 ||
      this.postalCode.length === 0 ||
       
      this.zip.length === 0  ) {
    console.log("Please fill in all form fields");
  } else {
    this.dataService.bodyToSend.fname = this.firstname;
    this.dataService.bodyToSend.lname = this.lastname;
    this.dataService.bodyToSend.tel = this.telephone;
    this.dataService.bodyToSend.address = this.address;
    this.dataService.bodyToSend.city = this.city;
    this.dataService.bodyToSend.postalCode = this.postalCode;
    this.dataService.bodyToSend.email = this.email;;
    this.dataService.bodyToSend.zip = this.zip;
    this.dataService.bodyToSend.paiement = {
      code: "",
      discountValue: this.totalPrice,
      shipmentPrice: this.ShippementCost,
      productsTotal: this.total
    };


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
