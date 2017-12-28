import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
  
@Injectable()
export class AuthService {
  username:string;
  shop_id:number;
  totalPrice:number;

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
  setTotalPrice(totalPrice){
    this.totalPrice=totalPrice;
  }
  getTotalPrice(){
    return this.totalPrice;
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

  public addProduct(addProductDetails,shop_id){
    return this.http.post("http://localhost/carbon/api/addProduct.php",{"shop_id":shop_id,"productname":addProductDetails.productname,"price":addProductDetails.price,"details":addProductDetails.details,"picture":addProductDetails.picture}).map(res=>res.json());
  }

  public addShop(credentials){
    return this.http.post("http://localhost/carbon/api/addShop.php",{"shopname":credentials.shopname,"description":credentials.description,"profilePic":credentials.profilePic}).map(res=>res.json());
  }
  public makeOwner(credentials){
    return this.http.post("http://localhost/carbon/api/makeOwner.php",{"ownername":credentials.ownername,"shop_id":credentials.shopid,}).map(res=>res.json());
  }
  
  public getUserInfo(){
    console.log(this.username);
    return this.http.post("http://localhost/carbon/api/user.php",{"username":this.username}).map(res=>res.json());
  }

  public getShops(){ //get all shop details
    return this.http.get("http://localhost/carbon/api/shops.php").map(res=>res.json());
  }

  public getProducts(){
    return this.http.post("http://localhost/carbon/api/productDetails.php",{ "shopid":this.shop_id }).map(res=>res.json());
  }

  public getShopDetails(){
    return this.http.post("http://localhost/carbon/api/getShop.php",{"username":this.username}).map(res=>res.json());
  }

  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public getCart(){
    return this.http.post("http://localhost/carbon/api/getCart.php",{"username":this.username}).map(res=>res.json());
  }

  public removeCart(cart_id){
    return this.http.post("http://localhost/carbon/api/removeCart.php",{"cart_id":cart_id}).map(res=>res.json());
  }

  public removeProduct(id){
    return this.http.post("http://localhost/carbon/api/removeProduct.php",{"id":id}).map(res=>res.json());
  }

  public addToCart(id,price,quantity){
    return this.http.post("http://localhost/carbon/api/addToCart.php",{"username":this.username,"id":id,"price":price,"quantity":quantity}).map(res=>res.json());
  }

  public checkout(credentials){
    return this.http.post("http://localhost/carbon/api/checkout.php",{"username":this.username,"firstname":credentials.firstname,"lastname":credentials.lastname,"streetaddress":credentials.streetaddress,'city':credentials.city,'email':credentials.email,'telephone':credentials.telephone}).map(res=>res.json());
  }
  public getOrders(){
    return this.http.post("http://localhost/carbon/api/getOrders.php",{"shop_id":this.shop_id}).map(res=>res.json());
  }
  public removeOrder(id){
    return this.http.post("http://localhost/carbon/api/removeOrder.php",{"order_id":id}).map(res=>res.json());
  }
}