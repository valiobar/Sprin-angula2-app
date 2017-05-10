import {Component, OnInit, Input} from '@angular/core';
import {ReggataService} from "../../services/reggata.service";

@Component({
  selector: 'app-reggata',
  templateUrl: 'reggata.component.html',
  styleUrls: ['reggata.component.css']
})
export class ReggataComponent implements OnInit {

  constructor(private reggataService:ReggataService) { }

  @Input()
  reggataId:any;

  reggata:any;

  ngOnInit() {
    this.reggataService.getReggataById(this.reggataId).subscribe(
      data => {
        this.reggata = data;
        console.log(data)
      },
      err => console.log(err)
    );
  }



}
