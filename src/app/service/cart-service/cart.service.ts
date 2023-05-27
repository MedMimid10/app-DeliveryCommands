import { Injectable } from '@angular/core';
import { Product } from 'src/app/data-interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProduct :Product[]=[];

}
