
import {Component, OnInit, AfterViewInit, Input, SimpleChange} from '@angular/core';
import {ReggataService} from '../../services/reggata.service'
import {Deferred} from "../../utils/deferred";
import {GlobalVariablesService} from "../../services/global-variables.service";
import {Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-reggata-all',
  templateUrl: './reggata-all.component.html',
  styleUrls: ['./reggata-all.component.css'],
  providers:[ReggataService]
})
export class ReggataAllComponent implements OnInit {
  reggatsAll:any[];
   myReggatas:any[];
  filetByDistanceReggatas:any[];
  private route:any;

  distaneFilter:number=50;
  constructor( private reggataServise:ReggataService,private globals:GlobalVariablesService, r:Router) {
    this.route=r;
  }

  ngOnInit() {
    this.reggataServise.getAllReggatas().subscribe(
      data => {
        this.reggatsAll = data;
        this.getMyReggata(this.reggatsAll).then(result=>this.myReggatas=result);
        this.getReggataByDistance(this.reggatsAll).then(result=>this.filetByDistanceReggatas=result);
        console.log(data);
      },
      err => console.log(err)
    );

  }
  ngOnChanges(changes:SimpleChange) {
    console.log(changes)
  }
  getMyReggata(allreggatas):Promise<any>{
    let def = new Deferred();
    let myReggatas = [];
    allreggatas.forEach(reggata=>{
      if(reggata.username==this.globals.username){
        myReggatas.push(reggata);
      }
    });
    def.resolve(myReggatas);
    return def.promise;

  }
  getReggataByDistance(allreggatas):Promise<any>{
    let def = new Deferred();
    let distReggatas = [];
    allreggatas.forEach(reggata=>{
      console.log(reggata);
     let dist = this.calcDistance(this.globals.userPort.point,reggata.reggataPoints[0]);
      if(+dist<=this.distaneFilter){
        distReggatas.push(reggata);
      }
    });
    def.resolve(distReggatas);
    return def.promise;
  }

  filterByDistance(){
    this.filetByDistanceReggatas=null;
    console.log(this.distaneFilter)
    this.getReggataByDistance(this.reggatsAll).then(result=>this.filetByDistanceReggatas=result);
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

  showDetails(id){
    this.route.navigate(['show-reggata/'+id])
  }
}
