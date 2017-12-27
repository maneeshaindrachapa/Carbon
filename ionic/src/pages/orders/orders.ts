import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  items:Items[];
  constructor(private nav: NavController,private auth: AuthService ) {
    this.getItems();
  }

  getItems(){
    this.auth.getOrders().subscribe(res => {
      this.items=res;
    },
    error => {
      console.log(error);
    });
  }

  removeItem(order_id){
    this.auth.removeOrder(order_id).subscribe(res => {
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
  order_id:string;
  firstname:string,
  lastname:string,
  product_id:string,
  productname:string,
  quantity:string,
  pricePay:string,
  city:string,
  street:string,
  email:string,
  telephone:string,
}