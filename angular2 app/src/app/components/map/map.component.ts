import {Component, OnInit, Output, EventEmitter, ViewChild, SimpleChanges} from '@angular/core';

import {SebmGoogleMap, PolylineManager, LatLngLiteral} from 'angular2-google-maps/core';
import {SebmGoogleMapPolyline} from 'angular2-google-maps/core';
import {Directive, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {LatLngBounds, LatLng, MapsAPILoader, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {MapManipulatorComponent} from "./map-manipulator.component";
import {Deferred} from "../../utils/deferred"
declare var ease, TimelineMax,TweenMax,Power4,Power0,Power2,Power3,Bounce, Elastic:any;
import "gsap";

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [SebmGoogleMapPolyline, PolylineManager, SebmGoogleMap]
})
export class MapComponent implements OnInit {


  @ViewChild(MapManipulatorComponent)
  private mapManipulat: MapManipulatorComponent;

  public mapBounds: LatLngBounds = null;

  private mapLoadedSubject: Subject<boolean> = new Subject<boolean>();
  alerts:any[]=[];
  @Input()
  searchBox: any;
  @Input()
  isCreateReggataMap: boolean = true;
  @Output()
  onNewPoint = new EventEmitter<any>();
  @Output()
  onPointDeleted = new EventEmitter<any>();
  // google maps zoom level
  @Input()
  zoom: number = 15;
  @Input()
  showLogs: boolean = true;
  @Output()
  onSearch = new EventEmitter<any>();
  @Input('center')
  mapInitCenter = {
    lat: 43.2140504,
    lng: 27.914823299999966
  };
  @Input('markers')
  markers: marker[] = [];
  map: any;
  legs: any[] = [];
  totalDistance: number=0;
 infoWindow:string;
  spin:boolean=false;
  constructor( private mapsAPILoader: MapsAPILoader) {


  }

  ngOnChanges(changes) {
    if(changes.mapInitCenter) {
      let point = {
        lat: changes.mapInitCenter.currentValue.lat,
        lng: changes.mapInitCenter.currentValue.lng
      };

      this.mapManipulat.setCenter(<LatLngLiteral>point);
    }
    if(changes.markers){
      this.mapsAPILoader.load().then(() => {
        this.mapLoadedSubject.next(true);
        /*this.mapLoadedSubject.complete();*/
      });
      console.log(this.markers);
      this.updateLegs();
      this.mapBounds=null;
      this.mapLoadedSubject.asObservable().subscribe(mapLoaded => {
        console.log(mapLoaded);
        this.onFitContents(this.markers, mapLoaded);


      });

    }
  }

  ngOnInit() {

     console.log(this.markers);
      this.mapLoadedSubject.asObservable().subscribe(mapLoaded => {
      this.onFitContents(this.markers, mapLoaded);
      if (this.searchBox) {
        console.log(this.initAutocomplete(this.searchBox));
        console.log(this.mapInitCenter)
      }
      ;

      console.log("opa")
    })

  }

  public ngAfterViewInit() {
    console.log('after init')
    this.mapsAPILoader.load().then(() => {
      this.mapLoadedSubject.next(true);
      /*this.mapLoadedSubject.complete();*/
    });
  }


  private onFitContents(markers: marker[], mapLoaded: boolean) {
    // We must wait for mapLoaded to become true, because before that
    // the "google" api variable is undefined.
    if (!mapLoaded || markers.length < 2) {
      return;
    }

    let bounds: LatLngBounds = new google.maps.LatLngBounds();
    this.updateLabels();
    for (let coordinate of markers) {
      let point: LatLng = new google.maps.LatLng(coordinate.lat, coordinate.lng);
      bounds.extend(point);
    }
    console.log(bounds)
    this.mapBounds = bounds;
  }

  clickedMarker(lat,lng) {
    this.infoWindow='Lat: '+lat+" Lng: "+lng;
  }

  private displayPathElevation(path, elevator): Promise<boolean> {
   this.spin=true;
    let def = new Deferred();
    let pathOk: boolean=true;

    elevator.getElevationAlongPath({
      'path': path,
      'samples': 100
    }, (result, status)=> {
      if (status == 'OK') {

        result.forEach(result=> {

         if(result.elevation > 0.5){
           pathOk=false;
         };
        });

        def.resolve(pathOk);

      } else {

        def.reject(status)
      }
    });
    return def.promise;
  }

  mapClicked($event: any) {


    if (this.isCreateReggataMap) {

      let newpoint = {
        lat: $event.coords.lat,
        lng: $event.coords.lng
      };
     console.log($event.coords);
      if (this.markers.length > 0) {
        let path: LatLngLiteral[] = [];
        path.push(<LatLngLiteral>newpoint);
        path.push(<LatLngLiteral>this.markers[this.markers.length - 1]);

        this.displayPathElevation(path, new google.maps.ElevationService).then(resp=> {
          if (resp) {
this.spin=false;
            this.onNewPoint.emit(newpoint);
            this.markers.push({
              lat: $event.coords.lat,
              lng: $event.coords.lng,

            });
            this.updateLabels();
            this.updateLegs();
          }else{
            this.spin=false;
            this.alerts.push({
              type: 'error',
              msg: `This leg path is not valid (check if path cross land)`,
              timeout: 2500
            })
          }
        });
      } else{
        this.onNewPoint.emit(newpoint);
        this.markers.push({
          lat: $event.coords.lat,
          lng: $event.coords.lng,

        });
        this.updateLabels();
        this.updateLegs();
      }


    }
  }

  private updateLabels() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].draggable = true;
      if (i == 0) {
        this.markers[i].label = "Start"
      } else if (i == this.markers.length - 1) {
        this.markers[i].label = "Finish"
      } else {
        this.markers[i].label = i.toString();
      }
    }
  }
private removeMarker(label){

  let index:number;
  if (label=='Start'){
    index=0;
  }else if(label=='Finish'){
    index=this.markers.length-1;
  }else{
    index=<number>+label
  }

  this.onPointDeleted.emit(index)
  this.markers.splice(index,1);
  console.log(this.markers);
  this.updateLabels();
  this.updateLegs();

}
  private updateLegs() {

    if (this.markers.length > 1) {
      let legsNew: any[] = [];
      let total: number = 0;
      for (let i = 1; i < this.markers.length; i++) {
        let firstLabel = this.markers[i - 1].label;
        let secondLabel = this.markers[i].label;
        let firstPoint = {
          lat: this.markers[i - 1].lat,
          lng: this.markers[i - 1].lng

        };
        let secondPoint = {
          lat: this.markers[i].lat,
          lng: this.markers[i].lng

        };
        let distance = this.calcDistance(firstPoint, secondPoint);
        total += +distance;
        let leg = {
          labelOne: firstLabel,
          labelTwo: secondLabel,
          distance: distance
        };

        legsNew.push(leg);
      }

      this.legs = legsNew;
      total = <number>+total.toFixed(2)
      this.totalDistance = total;

    }else {
      this.legs=[];
      this.totalDistance=0;
    }
  }

  private radians(x) {
    return x * Math.PI / 180;
  };


  private calcDistance(p1, p2) {

    let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.radians(p2.lat - p1.lat);
    let dLong = this.radians(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.radians(p1.lat)) * Math.cos(this.radians(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    let distance = (d / 1852).toFixed(2);
    return distance; // returns the distance in meter

  }

  markerDragEnd(m: marker, $event: any) {
   if(this.isCreateReggataMap){
     m.lat = $event.coords.lat;
     m.lng = $event.coords.lng;

     this.updateLegs();
   }

  }

  private selectPosrt(searchBox) {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    /*  // Clear out the old markers.
     markers.forEach(function (marker) {
     marker.setMap(null);
     });
     markers = [];*/

    // For each place, get the icon, name and location.

    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      /* var icon = {
       url: place.icon,
       size: new google.maps.Size(71, 71),
       origin: new google.maps.Point(0, 0),
       anchor: new google.maps.Point(17, 34),
       scaledSize: new google.maps.Size(25, 25)
       };
       console.log(icon);
       // Create a marker for each place.
       markers.push(new google.maps.Marker({
       map: map,
       icon: icon,
       title: place.name,
       position: place.geometry.location
       }));*/

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        var center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        console.log(center);


      } else {
        console.log(place.geometry.location);
        // mapBounds.extend(place.geometry.location);
      }
    });

  }

  private initAutocomplete(searchBox: any) {
    if (this.searchBox) {
      var that = this;
      var map = this.mapManipulat;
      // Create the search box and link it to the UI element.
      var center = null;
      var searchBox = new google.maps.places.SearchBox(searchBox);
//  map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);

      // Bias the SearchBox results towards current map's viewport.
      /*map.addListener('bounds_changed', function () {
       searchBox.setBounds(map.getBounds());
       });*/
      var emitter = this.onSearch;


      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        /*  // Clear out the old markers.
         markers.forEach(function (marker) {
         marker.setMap(null);
         });
         markers = [];*/

        // For each place, get the icon, name and location.

        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          /* var icon = {
           url: place.icon,
           size: new google.maps.Size(71, 71),
           origin: new google.maps.Point(0, 0),
           anchor: new google.maps.Point(17, 34),
           scaledSize: new google.maps.Size(25, 25)
           };
           console.log(icon);
           // Create a marker for each place.
           markers.push(new google.maps.Marker({
           map: map,
           icon: icon,
           title: place.name,
           position: place.geometry.location
           }));*/

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            center = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };


            // map.setCenter(latLog);
            console.log(center);
            emitter.emit(center);
            map.setCenter(<LatLngLiteral>center)
          } else {
            console.log(place.geometry.location);
            // mapBounds.extend(place.geometry.location);
          }
        });

      });
      /*console.log(center);
       if(center){

       this.mapInitCenter=center;
       console.log('emit');
       this.onSearch.emit(center);

       return center;

       } else{
       return 'no result'
       }*/

    }
  }
}
