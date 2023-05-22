import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/data-interfaces/Product';
import { Category } from 'src/app/data-interfaces/Category';
import { ShipmentType } from 'src/app/data-interfaces/ShipmentType';
import { Shipment } from 'src/app/data-interfaces/Shipment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  private hostUrl='http://localhost:8080';
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
}
