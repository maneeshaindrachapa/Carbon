import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopproductsPage } from './shopproducts';

@NgModule({
  declarations: [
    ShopproductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopproductsPage),
  ],
})
export class ShopproductsPageModule {}
