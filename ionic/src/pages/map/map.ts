import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef:ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.DisplayMap();
  }


  DisplayMap() {

    const location = new google.maps.LatLng(6.894127,
      79.854620);

    const options = {
      center:location,
      zoom:10,
      streetViewControl:false,
      mapTypeId:'roadmap'
    };

    const map = new google.maps.Map(this.mapRef.nativeElement,options);

    this.addMarker(location,map);
  }

  addMarker(position,map) {
    return new google.maps.Marker({
      position,
      map
    });
  }

}
