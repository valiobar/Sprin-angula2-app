import {Component, OnInit} from '@angular/core';
import {PortService} from '../../services/port.service';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { JwtHelper } from 'angular2-jwt';
import {Router, RouterModule} from '@angular/router';
import { GlobalVariablesService} from '../../services/global-variables.service'

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: [PortService, FormsModule,UserService,RouterModule]
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  confirmPassword:string;
  email:string;
  portName:string;
  private jwtHelper= new JwtHelper();
  private router;

  constructor(private portService: PortService,private userSerice:UserService,private localStorage:LocalStorageService,
  private globals:GlobalVariablesService,
              r:Router


  ) {
    this.router=r;
  }

  ports: any[];

  create(){
    let user ={
      username:this.username,
      password:this.password,
      email:this.email,
      confirmPassword:this.confirmPassword,
      portName:this.portName


    };

   this.userSerice.create(user).subscribe(newUser=>{
     console.log(newUser.json());
     let loginUser={
       username:this.username,
       password:this.password
     };
this.userSerice.login(loginUser).subscribe(res=>{
  let token = res.json().token;
  console.log(token);
  this.globals.token=token;
  this.localStorage.store('sailing-user',token);
  console.log(this.jwtHelper.decodeToken(token));
  this.globals.username=this.jwtHelper.decodeToken(token).sub;
  console.log(this.globals.username);
  this.router.navigate(['/']);


})
   });
  }
  ngOnInit() {

    this.portService.getAll().subscribe(ports=>this.ports=ports)
  }

}
