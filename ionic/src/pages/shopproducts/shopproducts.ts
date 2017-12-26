import { Component } from '@angular/core';
import { NavController, AlertController,IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-shopproducts',
  templateUrl: 'shopproducts.html',
})
export class ShopproductsPage{

  username = '';
  addtocartSuccess = false;

  products:Products[]=[];
  items:Products[]=[];
  quantity:number=1;
  price:number=1;

  constructor(private nav: NavController, private auth: AuthService,private alertCtrl: AlertController) {
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

  addToCart(id,price){
    this.price=this.quantity * price;
    this.auth.addToCart(id,this.price,this.quantity).subscribe(res => {
      this.price=1;
      if (res) {
        this.addtocartSuccess = true;
        this.showPopup("Success", "Added to Cart");
      } else {
        this.showPopup("Error", "Problem Adding to Cart");
      }
      console.log(res);
     },
     error => {
       console.log(error);
     });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.addtocartSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}

interface Products{
  shop_id:string,
  productname:string,
  price:string,
  details:string,
  picture:string
}
