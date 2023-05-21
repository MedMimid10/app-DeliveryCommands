import { Component } from '@angular/core';
import { DataService } from '../service/data-service/data.service';
import { Product } from '../data-interfaces/Product';
import { Category } from '../data-interfaces/Category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products:Product[]=[];
  categories:Category[]=[];

  constructor(private dataService:DataService){}

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
