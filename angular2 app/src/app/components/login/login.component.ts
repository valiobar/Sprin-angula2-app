import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { JwtHelper } from 'angular2-jwt';
import {Router, RouterModule} from '@angular/router';
import { GlobalVariablesService} from '../../services/global-variables.service'
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  jwtHelper:any;
  loginUser:{
    username:string,
    password:string
  };
  @Output()
  onCreate = new EventEmitter<any>();
  route:any;
  constructor(private userSerice:UserService,private localStorage:LocalStorageService,
              private globals:GlobalVariablesService,r:Router
  ) {
    this.route=r;
    this.loginUser={username:'',
    password:''};
    this.jwtHelper= new JwtHelper();
  }

  ngOnInit() {
  }

login(){
  this.userSerice.login(this.loginUser).subscribe(res=>{
    let token = res.json().token;
    console.log(token);
    this.globals.token=token;
    this.localStorage.store(this.globals.tokenName,token);
    console.log(this.jwtHelper.decodeToken(token));
    this.globals.username=this.jwtHelper.decodeToken(token).sub;
    console.log(this.globals.username);
    this.onCreate.emit(this.globals.username);

  },
  err=>console.log(err)
  )
}
}
