import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  createSuccess = false;
  checkoutCredentials = { firstname:'',lastname:'',streetaddress:'', city: '',email:'',telephone:'' };
  totalPrice:number=0;
  username:string="";

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {
    this.totalPrice=this.auth.getTotalPrice();
    this.username=this.auth.getUser();
   }
 
  public checkout() {
    this.auth.checkout(this.checkoutCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Order Placed");
      } else {
        this.showPopup("Error", "Problem Placing Order");
      }
    },
      error => {
        this.showPopup("Error", error);
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
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

}
