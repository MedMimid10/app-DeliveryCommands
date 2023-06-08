import { Injectable } from '@angular/core';
import { Product } from 'src/app/data-interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];


  removeItem(index: number){
    this.items.splice(index, 1);
}

  addToCart(product: Product) {
    const productToAdd: Product = { ...product, quantity: 1 };
    this.items.push(productToAdd);
  }

  isProductInCart(product: Product): boolean {
    return this.items.some(item => item.code === product.code);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }



}
