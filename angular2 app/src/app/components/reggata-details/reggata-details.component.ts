import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReggataService} from "../../services/reggata.service";
import {GlobalVariablesService} from "../../services/global-variables.service";

import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-reggata-details',
  templateUrl: './reggata-details.component.html',
  styleUrls: ['./reggata-details.component.css'],
  providers: [ReggataService]
})
export class ReggataDetailsComponent implements OnInit {
  alerts:any[]=[];
  id:number;
  reggata:any;
  router:any;
  constructor(private globals:GlobalVariablesService,private reggataService:ReggataService,private route: ActivatedRoute,r:Router) {
    this.router=r;
  }

  ngOnInit() {
    console.log('details')
     this.route.params.subscribe(params => {
      this.id = +params['id'];
       this.reggataService.getReggataById(this.id).subscribe(reggata=>this.reggata=reggata,
       error=>console.log("opaaaa"))
     });
    }

  reggataSignIn(){
    let valid = true
    this.reggata.participents.forEach(part=>{

      console.log(this.globals.userId)
      if(part.id == this.globals.userId){

        valid=false;
      }
    });
    console.log(valid);
    if(valid){
      let reggataId =this.reggata.id;
      this.reggata=null;

      this.reggataService.reggataAddParticipant(this.globals.userId,reggataId)
        .subscribe(res=>{
          this.reggataService.getReggataById(this.id).subscribe(reggata=>this.reggata=reggata,
            error=>console.log("opaaaa"))

        });
    }else{
      this.alerts.push({
        type: 'error',
        msg: `You are already sign in for this reggata`,
        timeout: 2500
      })
    }


  }
}
