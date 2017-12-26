import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items:Items[];
  constructor(private nav: NavController, private auth: AuthService) {
    this.getItems();
  }

  getItems(){
    this.auth.getCart().subscribe(res => {
      this.items=res;
    },
    error => {
      console.log(error);
    });
  }

  removeItem(cart_id){
    this.auth.removeCart(cart_id).subscribe(res => {
      this.getItems();
    },
    error => {
      console.log(error);
    });
  }

  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
}

interface Items{
  id:string,
  cart_id:string;
  quantity:string;
  price:string;
  productname:string;
  picture:string;
}