import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { GlobalVariablesService} from './global-variables.service'
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  loggedUser:any;
  constructor(private http:Http,private globals:GlobalVariablesService) { }


  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public getUserByUsername(username):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


   return this.http.get('http://localhost:8080/users/'+username) .catch(this.handleError) ;
  }

 public create(user): Observable<any> {
    console.log(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.post('http://localhost:8080/users/', user,options)
      .catch(this.handleError) ;
  }
  public login(loginUser): Observable<any> {
    console.log(loginUser);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //noinspection TypeScriptValidateTypes
    return this.http.post('http://localhost:8080/users/login', loginUser,options)
      .catch(this.handleError) ;
  }

}
