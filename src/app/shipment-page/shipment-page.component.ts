import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../data-interfaces/Product';
import { ShipmentType } from '../data-interfaces/ShipmentType';
import { PaiementDto } from '../data-interfaces/paiemetDto';
import { DataService } from '../service/data-service/data.service';

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css']
})
export class ShipmentPageComponent {

  totalPrice:number=0;
  shipmentCost:number=14;
  total: number = 0;
  products: Product[] = [];
  firstname: string = "";
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
  shipmentSelectedId=0

  phoneRegex = /^0\d{9}$/;
  emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  postalCodeRegex =/^\d{5}$/;
  zipRegex = /^\d{5}$/;

  registerBody = { tel: '', email: '', postalCode: '', zip: '' };



  constructor(private router:Router,private dataService:DataService,private route:ActivatedRoute,private toastr: ToastrService){}

  ngOnInit(){
    this.dataService.getShipmentTypes().subscribe(shipmentTypes=>{
      // console.log(shipmentTypes);
      this.shipmentTypes=shipmentTypes;
    })
    if(!history.state.totalPrice || !history.state.products){
      this.router.navigate(['/']);
    } else {
      this.totalPrice = history.state.totalPrice;
      this.products = history.state.products;

      this.products.forEach((product) => {
        this.dataService.bodyToSend.products.push({
          id: product.id,
          quantity: product.quantity
        });
      });

      this.calculateTotalPrice();
    }


  }
  calculateTotalPrice(): void {
    this.total=this.totalPrice+this.shipmentCost;
 }

 validateForm() {
  if (!this.phoneRegex.test(this.registerBody.tel)) {
    this.toastr.error("Format de numéro de téléphone n'est pas valide");
    return;
  }
  if (!this.emailRegex.test(this.registerBody.email)) {
    this.toastr.error("E-mail est erroné");
    return;
  }
  if (!this.postalCodeRegex.test(this.registerBody.postalCode)) {
    this.toastr.error("Le code postal est invalide");
    return;
  }
  if (!this.zipRegex.test(this.registerBody.zip)) {
    this.toastr.error("Le code ZIP est invalide");
    return;
  }
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
    this.dataService.bodyToSend.shipmentType = this.shipmentSelectedCode
    this.dataService.bodyToSend.paiement = {
      code: "",
      discountValue: this.totalPrice,
      shipmentPrice: this.shipmentCost,
      productsTotal: this.total
    };


    console.log(this.dataService.bodyToSend);
    this.router.navigate(['/paiement-online']);
  }
}


  selectShipment(code:any){
    let selectedShipment = this.shipmentTypes.find((shipmentType)=>shipmentType.code===code)
    this.shipmentSelectedCode = code;
    this.shipmentCost=selectedShipment?.price||0
    this.total=this.totalPrice+this.shipmentCost
  }

  backtoCart(){

  this.dataService.bodyToSend={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",email:"",status:"",shipmentType:"",products:[],paiement:{}};

  this.router.navigate(['/cart'])
  }
}
