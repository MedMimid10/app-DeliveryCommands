import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart-service/cart.service';
import { Product } from '../data-interfaces/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  totalPrice :number = 0;
  items: Product[] = [];

  constructor(public router: Router, private cartService: CartService) {}
  

  ngOnInit() {
    this.items = this.cartService.getItems(); // Assign the items from the cart service
    this.calculateTotalPrice();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.calculateTotalPrice();
  }

  confirmPayment() {
    this.router.navigate(['/shippement-page'],{state:{totalPrice:this.totalPrice}})
    
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartService.calculateTotalPrice();
  }

  increaseQuantity(item: Product) {
    item.quantity++;
    this.calculateTotalPrice();
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalPrice();
    }
  }
}
