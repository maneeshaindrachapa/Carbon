import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  shops:Shops;
  username:string;
  shopCredentials = { shopname: '',description:'',profilePic:''};
  ownerCredentials={ownername:'',shopid:'x'};
  createSuccess=false;
  ownerSuccess=false;
  
  constructor(private nav: NavController, private auth:AuthService,private alertCtrl: AlertController) {
    this.username=this.auth.getUser();

    this.auth.getShops().subscribe(shop => {
      this.shops=shop;
     },
     error => {
       console.log(error);
     });
  }

  public addShop() {
    this.auth.addShop(this.shopCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Shop Added.");
      } else {
        this.showPopup("Error", "Problem Adding Shop.");
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

  makeOwner(){
    console.log(this.ownerCredentials.shopid);
    if(this.ownerCredentials.shopid!="x"){
      console.log(this.ownerCredentials);
      this.auth.makeOwner(this.ownerCredentials).subscribe(success => {
        if (success) {
          this.ownerSuccess = true;
          this.showPopup("Success", "User now an Owner of"+this.shopCredentials.shopname);
        } else {
          this.showPopup("Error", "Problem Making an Owner");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }else{
      this.showPopup("Error", "Please Select a Shop");
    }
  }

  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

}

interface Shops{
  shop_id:string,
  shopname:string,
  description:string,
  profilePic:string
}