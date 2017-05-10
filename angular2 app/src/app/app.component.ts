import { Component } from '@angular/core';
import { GlobalVariablesService} from './services/global-variables.service'
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { JwtHelper } from 'angular2-jwt';
import {UserService} from './services/user.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {

  jwtDecoder:any;

  constructor(private globals:GlobalVariablesService,private localStorage:LocalStorageService,private userService:UserService){
    this.jwtDecoder=new JwtHelper();
   // console.log(this.jwtDecoder.isTokenExpired('sailing-user'));
    let token=  this.localStorage.retrieve('sailing-user');
       if(token!=null){
         console.log(token);
         this.globals.token=token;
         this.globals.username=this.jwtDecoder.decodeToken(token).sub;
         this.userService.getUserByUsername(this.globals.username).subscribe(data=> {

           this.globals.userPort = data.json().port;
           this.globals.userId = data.json().id;
         })
        let time=this.jwtDecoder.decodeToken(token).exp;
         console.log(time);
       }


  }
}
