import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";


@Injectable()
export class PortService {

  constructor(private http: Http) { }
  getAll() {
    return this.http.get(`http://localhost:8080/port/all`)
      .map((res:Response) => res.json());
  }
  create(port): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //noinspection TypeScriptValidateTypes
    return this.http.post('http://localhost:8080/port/', port,options)
      .catch(this.handleError) ;
  }

  private handleError (error: Response | any) {

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

}
