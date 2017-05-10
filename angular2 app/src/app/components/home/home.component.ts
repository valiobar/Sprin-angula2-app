import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ReggataService} from '../../services/reggata.service'
import {Observable} from "rxjs";

declare var ease, TimelineMax,TweenMax,Power4,Power0,Power2,Power3,Bounce, Elastic:any;
import "gsap";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers:[ReggataService]
})
export class HomeComponent implements OnInit  {

  reggats:any;
  selectedReggat:any;

  constructor( private reggataServise:ReggataService) { }

  ngOnInit() {
    //noinspection TypeScriptUnresolvedFunction
    this.reggataServise.getLastFive().subscribe(
      data => {
        this.reggats = data;
        console.log(data);


      },
      err => console.log(err)
    );
}

  selectReggata(reggata){
    if(this.selectedReggat){
      this.selectedReggat=null

    }


    this.selectedReggat=reggata


  }



}
