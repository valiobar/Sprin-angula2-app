import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService} from '../../services/global-variables.service'
import {LocalStorageService} from 'ngx-webstorage';
import { MzModalService } from 'ng2-materialize';
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private globals:GlobalVariablesService,private localStorage:LocalStorageService,private modalService:MzModalService) { }
  isIn = false;
  dropdown =false// store state
  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }
  toggleDropdown() { // click handler
    let bool = this.dropdown;
    this.dropdown = bool === false ? true : false;
    console.log(this.dropdown);
  }
  ngOnInit() {
  }
   onCreate(event){
    document.getElementById('closeModal').click();
   }
   modalOptions: Materialize.ModalOptions = {
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .1, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '50%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute


  };
  signOut(){
    this.globals.username=null;
    this.globals.token=null;
    this.localStorage.clear(this.globals.tokenName);

  }
}
