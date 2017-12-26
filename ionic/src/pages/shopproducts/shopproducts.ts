import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-shopproducts',
  templateUrl: 'shopproducts.html',
})
export class ShopproductsPage{

  username = '';

  products:Products[]=[];
  items:Products[]=[];

  constructor(private nav: NavController, private auth: AuthService) {
    this.username=this.auth.getUser();

    this.initializeItems(); 
  }

  initializeItems(){
    this.auth.getProducts().subscribe(product => {
      for(let i in product){
        this.items.push(product[i]);
        this.products.push(product[i]);
      }
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

  initializeSearch(){
    this.items=this.products;
  }

  getProductDetails(ev: any) {
    // Reset items back to all of the items
    this.initializeSearch();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if(item.productname.toLowerCase().indexOf(val.toLowerCase()) > -1){
          console.log(this.items);
          return item;
        };
      });
    }
    return false;
  }
}

interface Products{
  shop_id:string,
  productname:string,
  price:string,
  details:string,
  picture:string
}
