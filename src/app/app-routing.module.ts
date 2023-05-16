import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { PaimentOnlineComponent } from './paiment-online/paiment-online.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { ShipmentPageComponent } from './shipment-page/shipment-page.component';
import { TraficOrdersComponent } from './trafic-orders/trafic-orders.component';
const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent
 },
 {
    path: 'contact-us',
    component: ContactUsComponent
 },
 {
    path: 'paiment-online',
    component: PaimentOnlineComponent
 },

 {
    path:'cart',
    component: CartComponent
 },
 {
  path:'shipment-page',
  component: ShipmentPageComponent
},
{
  path:'trafic-orders',
  component: TraficOrdersComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
