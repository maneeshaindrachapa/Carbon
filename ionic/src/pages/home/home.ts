import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';

  shops:Shops[]=[];
  items:Shops[]=[];

  constructor(private nav: NavController, private auth: AuthService) {
    this.auth.getUserInfo().subscribe(res => {
        this.username=res.username;
      },
      error => {
        console.log(error);
      });

      this.initializeItems(); 
  }

  initializeItems(){
    this.auth.getShops().subscribe(shop => {
      for(let i in shop){
        this.items.push(shop[i]);
        this.shops.push(shop[i]);
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
    this.items=this.shops;
  }

  getShopDetails(ev: any) {
    // Reset items back to all of the items
    this.initializeSearch();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if(item.shopname.toLowerCase().indexOf(val.toLowerCase()) > -1){
          console.log(this.items);
          return item;
        };
      });
    }
    return false;
  }
}

interface Shops{
  shopname:string,
  description:string,
  profilePic:string
}