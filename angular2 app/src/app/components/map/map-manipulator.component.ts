import { Component, OnInit } from '@angular/core';
import {GoogleMapsAPIWrapper, LatLngLiteral} from "angular2-google-maps/core";

@Component({
  selector: 'app-map-manipulator',
  template:""
})
export class MapManipulatorComponent implements OnInit {

  map:any;
  constructor(private _wrapper: GoogleMapsAPIWrapper) {
    // then you have the right instance here
   this.map= this._wrapper.getNativeMap();
  }

  public setCenter(LatLong:LatLngLiteral){

  this.map.then(map=>map.panTo(LatLong));
  }

  ngOnInit() {
  }

}
