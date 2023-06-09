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
export class ProductListComponent {
  searchTerm: string = "";
  products:Product[]=[];
  categories:Category[]=[];
  filteredProducts: Product[] = [];
  selectedCategory: string = "Categories";

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


  ngOnInit():void{
    this.dataService.getProducts().subscribe(products=>{
      // console.log(products)
      this.products=products;
      this.filteredProducts=products
    })
    this.dataService.getCategories().subscribe(categories=>{
      // console.log(categories)
      this.categories=categories;
    })

  }
  filterProducts(): void {

    this.filteredProducts = this.products;

    // Filter by search term
    if (this.searchTerm.trim() !== "") {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== "Categories") {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.category.code === this.selectedCategory
      );
    }
  }

}
