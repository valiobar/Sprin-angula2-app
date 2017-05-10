import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { GlobalVariablesService} from './global-variables.service'
import 'rxjs/add/operator/map';
import {Router, RouterModule} from '@angular/router';
import {Observable} from "rxjs";
import {error} from "util";
@Injectable()
export class ReggataService {
options:any;
  private router;
  reggatasAll:any;

  constructor(private http: Http,private globals:GlobalVariablesService,  r:Router) {
    this.router=r;
    let headers = new Headers({ 'Content-Type': 'application/json' });
   if(this.globals.token)
     headers.append('Authorization', this.globals.token);
    this.options = new RequestOptions({ headers: headers });

  }
  getAllReggatas() {
   return this.http.get('http://localhost:8080/reggatas/all',this.options)
     .map(res =>res.json())

  }
  getReggataById(id){
    return this.http.get('http://localhost:8080/reggatas/'+id,this.options)
      .map(res =>res.json())
  }
  getLastFive() {
    return this.http.get('http://localhost:8080/reggatas/last5')
      .map(res =>res.json())

  }
  reggataAddParticipant(userId,reggataId) {
    return this.http.get('http://localhost:8080/reggatas/addUser/'+userId+'/'+reggataId,this.options)


  }
 createReggatas(reggata:any) {
    return this.http.post('http://localhost:8080/reggatas/',reggata,this.options)
      .subscribe(
        data =>console.log(data),
        err =>  {console.log(err);
        this.router.navigate(['/'])} ,
        () => console.log("finish")
      );
  }
}
