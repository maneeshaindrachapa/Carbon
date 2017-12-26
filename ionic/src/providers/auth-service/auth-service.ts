import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
  
@Injectable()
export class AuthService {
  username:string;
  shop_id:number;

  constructor(private http:Http){}
  setUser(username){
    this.username=username;
  }
  getUser(){
    return this.username;
  }
  setShop(shop_id){
    this.shop_id=shop_id;
    console.log(this.shop_id);
  }
  getShop(){
    return this.shop_id;
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      var headers= new Headers();
      headers.append('Content-Type','application/X-www-form=urlencoded');
      this.setUser(credentials.username);
      return this.http.post("http://192.168.8.100/carbon/api/login.php",{"username":credentials.username,"password":credentials.password}).map(res=>res.json());
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null||credentials.firstname === null||credentials.lastname === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post("http://192.168.8.100/carbon/api/signup.php",{"username":credentials.username,"firstname":credentials.firstname,"lastname":credentials.lastname,"password":credentials.password}).map(res=>res.json());
    }
  }

  public addProduct(addProductDetails,shop_id){
    return this.http.post("http://192.168.8.100/carbon/api/addProduct.php",{"shop_id":shop_id,"productname":addProductDetails.productname,"price":addProductDetails.price,"details":addProductDetails.details}).map(res=>res.json());
  }
  
  public getUserInfo(){
    console.log(this.username);
    return this.http.post("http://192.168.8.100/carbon/api/user.php",{"username":this.username}).map(res=>res.json());
  }

  public getShops(){ //get all shop details
    return this.http.get("http://192.168.8.100/carbon/api/shops.php").map(res=>res.json());
  }

  public getProducts(){
    return this.http.post("http://192.168.8.100/carbon/api/productDetails.php",{ "shopid":this.shop_id }).map(res=>res.json());
  }

  public getShopDetails(){
    return this.http.post("http://192.168.8.100/carbon/api/getShop.php",{"username":this.username}).map(res=>res.json());
  }

  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}