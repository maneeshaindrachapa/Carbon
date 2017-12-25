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
  constructor(private nav: NavController, private auth: AuthService) {
    this.auth.getUserInfo().subscribe(res => {
        this.username=res.username;
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