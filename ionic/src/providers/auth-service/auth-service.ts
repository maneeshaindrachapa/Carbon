import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
  
@Injectable()
export class AuthService {
  username:string;

  constructor(private http:Http){}
  setUser(username){
    this.username=username;
  }
  getUser(username){
    return this.username;
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      var headers= new Headers();
      headers.append('Content-Type','application/X-www-form=urlencoded');
      this.setUser(credentials.username);
      return this.http.post("http://localhost/carbon/api/login.php",{"username":credentials.username,"password":credentials.password}).map(res=>res.json());
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null||credentials.firstname === null||credentials.lastname === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post("http://localhost/carbon/api/signup.php",{"username":credentials.username,"firstname":credentials.firstname,"lastname":credentials.lastname,"password":credentials.password}).map(res=>res.json());
    }
  }
 
  public getUserInfo(){
    console.log(this.username);
    return this.http.post("http://localhost/carbon/api/user.php",{"username":this.username}).map(res=>res.json());
  }
 
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}