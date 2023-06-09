import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/data-interfaces/Product';
import { Category } from 'src/app/data-interfaces/Category';
import { ShipmentType } from 'src/app/data-interfaces/ShipmentType';
import { Shipment } from 'src/app/data-interfaces/Shipment';
import { ProductDto } from 'src/app/data-interfaces/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  bodyToSend:{code:string,fname:string,lname:string,tel:string,address:string,city:string,postalCode:string,zip:string,email:string,status:string,shipmentType:string,products:ProductDto[],paiement:{}}={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",email:"",status:"",shipmentType:"",products:[],paiement:{}};

  // {
  //   "code": "SHIP001",
  //   "fname": "John",
  //   "lname": "Doe",
  //   "tel": "123456789",
  //   "address": "123 Main Street",
  //   "city": "Cityville",
  //   "postalCode": "12345",
  //   "zip": "67890",
  //   "status": "Pending",
  //   "shipmentType": 1,
  //   "products": [
  //     {
  //       "id": 1,
  //       "quantity": 3
  //     },
  //     {
  //       "id": 2,
  //       "quantity": 2
  //     },
  //     {
  //       "id": 3,
  //       "quantity": 1
  //     }
  //   ],
  //   "paiement": {
  //     "code": "PAY001",
  //     "productsTotal": 100.0,
  //     "discountValue": 10.0,
  //     "shipmentPrice": 5.0
  //   }
  // }

  constructor(private http:HttpClient) { }

  private hostUrl='https://livraison.onrender.com';
  private productsUrl=`${this.hostUrl}/api/products`;
  private categoriesUrl=`${this.hostUrl}/api/categories`;
  private shipmentTypesUrl=`${this.hostUrl}/api/shipment-types`;
  private shipmentUrl=`${this.hostUrl}/api/shipments`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl);
  }
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.categoriesUrl);
  }
  getShipmentTypes():Observable<ShipmentType[]>{
    return this.http.get<ShipmentType[]>(this.shipmentTypesUrl);
  }
  getShipment(code:string):Observable<Shipment>{
    return this.http.get<Shipment>(this.shipmentUrl+`/${code}`);
  }
  createShipment(bodyToSend:any){
    return this.http.post(this.shipmentUrl+`/add`,bodyToSend,this.httpOptions);
  }
  getShipmentCostByCode(code: string): Observable<number> {
    const url = `${this.hostUrl}/api/shipments/${code}`;
    return this.http.get<number>(url);
  }
}
