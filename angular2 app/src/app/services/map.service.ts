import { Injectable } from '@angular/core';

@Injectable()
export class MapService {

  constructor() { }
 /* initMap(container, port,edditable, reggataPoints) {
     reggataMap = {};
    reggataMap.points = [];
    reggataMap.legDistance = [];
    reggataMap.totalDistance = 0;
    var markers = [];

     rout = [];
    routPath = new google.maps.Polyline({
      path: rout,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
     infowindow = new google.maps.InfoWindow({});
    let bounds = new google.maps.LatLngBounds();
    console.log(port);
    reggataMap.map = new google.maps.Map(document.getElementById(container), {
      zoom: 16,
      center: {lat: port.point.latitude, lng: port.point.longitude},
      mapTypeId: 'terrain',
      draggableCursor: "crosshair"
    });
    let rad = function (x) {
      return x * Math.PI / 180;
    };
    let getDistance = function (p1, p2) {
      let R = 6378137; // Earth’s mean radius in meter
      let dLat = rad(p2.lat() - p1.lat());
      let dLong = rad(p2.lng() - p1.lng());
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d; // returns the distance in meter
    };
    let distance = function (rout) {
      if (rout.length < 2) {
        return 0;
      }
      return getDistance(rout[rout.length - 2], rout[rout.length - 1])
    };
    reggataMap.addPoint = function (point) {
      reggataMap.points.push(point);
      let lat = parseFloat(point.latitude);
      let lng = parseFloat(point.longitude);
      let myLatlng = new google.maps.LatLng(lat, lng);

      rout.push(myLatlng);

      if (rout.length >= 2) {
        let trailhead_name = lat + '|' + lng;
        reggataMap.legDistance.push({
          distance: distance(rout),
          firstPoint: markers[markers.length - 1].title,
          secondPoint: trailhead_name
        });
      }
      let marker = new google.maps.Marker({
        position: myLatlng,
        map: reggataMap.map,
        title: trailhead_name
      });
      markers.push(marker);
      bounds.extend(marker.getPosition());

      routPath.setPath(rout);
      routPath.setMap(reggataMap.map);


    };
    if (reggataPoints) {

      for (let i = 0; i < reggataPoints.length; i++) {
        reggataMap.addPoint(reggataPoints[i]);
      }
      console.log("added")
      reggataMap.map.fitBounds(bounds);
    }

    reggataMap.changeCenter = function (point, container, map) {

      reggataMap.map = new google.maps.Map(document.getElementById(container), {
        zoom: 14,
        center: {lat: point.latitude, lng: point.longitude},
        mapTypeId: 'terrain',
        draggableCursor: "crosshair"
      });
      if (edditable) {
        reggataMap.map.addListener('click', function (event) {
          var point = {
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
          };
          reggataMap.addPoint(point);
        });
      }
    };
    reggataMap.setZoom = function (zoom) {
      reggataMap.map.zoom = zoom;

    };
    if (edditable) {
      console.log('edditabe')
      reggataMap.map.addListener('click', function (event) {
        var point = {
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng()
        };
        reggataMap.addPoint(point);
      });
    }
    return reggataMap;
  }*/
}
