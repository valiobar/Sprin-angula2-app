/**
 * Created by UserX on 5/8/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { GlobalVariablesService} from '../services/global-variables.service'
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private globals:GlobalVariablesService) {
  }

  canActivate() {

    if (this.globals.username!=null) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/']);
    return false;
  }
}
