import { Component, OnInit } from '@angular/core';
import {PortService} from '../../services/port.service'

@Component({
  selector: 'app-ports',
  templateUrl: 'ports.component.html',
  styleUrls: ['ports.component.css'],
  providers:[PortService]
})
export class PortsComponent implements OnInit {

  portName:string;
  portPosition:any;

  mapCenter={
  lat: 25.737748,
  lng: -80.184851
};

searchInput:any;
  constructor(private portService:PortService) { }

  ngOnInit() {
   this.searchInput=document.getElementById('search');
  }

  onSearch(point:any){
    this.portPosition=point;
  }
  create(){

    let port ={
      name:this.portName,
      point:this.portPosition
    };
    console.log(port);
    this.portService.create(port).subscribe(data=>{console.log('port create ');
      this.portPosition=null;
      this.portName=null;

    }, error => {
      console.log(JSON.stringify(error.json()));
    })
  }
}
