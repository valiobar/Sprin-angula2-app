import {Component, OnInit} from '@angular/core';
import {GlobalVariablesService} from '../../services/global-variables.service'
import {UserService} from '../../services/user.service'
import {LatLngLiteral} from "angular2-google-maps/core";
import {PortService} from "../../services/port.service"
import {ReggataService} from "../../services/reggata.service";


@Component({
  selector: 'app-reggata-create',
  templateUrl: './reggata-create.component.html',
  styleUrls: ['./reggata-create.component.css'],
  providers: [PortService,ReggataService]
})
export class ReggataCreateComponent implements OnInit {
  mapCenter: any;
  points: any[] = [];
  ports: any[];
  userPort: any;
  selectedPort: any;
  minDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  timeSelected: boolean;
  dt: any;

  constructor(private reggataService:ReggataService ,private portService: PortService, private globals: GlobalVariablesService, private userService: UserService) {

  }

  ngOnInit() {

    this.portService.getAll().subscribe(ports=>this.ports = ports);
    this.userService.getUserByUsername(this.globals.username).subscribe(data=> {
      this.mapCenter = <LatLngLiteral> data.json().port.point;
      this.userPort = data.json().port;

    })
  }

  addPoint(point) {
    this.points.push(point);
    console.log(this.points)
  }

  removePoint($event) {
    this.points.splice($event, 1);
  }

  timeSelect() {
    this.timeSelected = true;

  }

  createReggata() {
    let reggata: any = {
      port: this.userPort,
      reggataPoints: this.points,
      username:this.globals.username,
      reggataDate:this.dt,
    };
    console.log(reggata);
    this.reggataService.createReggatas(reggata);
  }
}
