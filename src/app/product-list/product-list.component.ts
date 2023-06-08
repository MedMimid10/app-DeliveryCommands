import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service/data.service';
import { Product } from '../data-interfaces/Product';
import { Category } from '../data-interfaces/Category';
import { CartService } from '../service/cart-service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];
  categories:Category[]=[];

  constructor(private dataService:DataService, private cartService : CartService,private snackBar: MatSnackBar){}
  addToCart(product: Product) {
    // Check if the product is already in the cart
    if (!this.cartService.isProductInCart(product)) {
      this.cartService.addToCart(product);
      this.snackBar.open('Product added to the cart!', 'Close', {
        duration: 1000, // Duration in milliseconds
      });
    } else {
      this.snackBar.open('Product is already in the cart!', 'Close', {
        duration: 1000, // Duration in milliseconds
      });
    }
  }



  ngOnInit(){
      this.dataService.getProducts().subscribe(products=>{
      console.log(products)
      this.products=products;
    })
    this.dataService.getCategories().subscribe(categories=>{
      console.log(categories)
      this.categories=categories;
    })
  }
}
