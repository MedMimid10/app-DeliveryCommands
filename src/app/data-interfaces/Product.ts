import { Category } from "./Category";

export interface Product{
    id: number;
    code:string,
    name:string,
    quantity:number,
    price:number,
    img_url:string,
    category:Category
}
