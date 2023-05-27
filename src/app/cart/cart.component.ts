import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart-service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  totalPrice: number = 0;

  items = this.cartService.getItems();


  constructor(public router:Router,private cartService:CartService){}
  ngOnInit() {
    this.calculateTotalPrice();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
}

  confirmPayment(){
    this.router.navigate(['/shippement-page'])
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cartService.calculateTotalPrice();
  }


}
