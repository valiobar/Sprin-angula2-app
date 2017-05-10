import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariablesService {
  tokenName='sailing-user';
  token:string;
  username:string;
  userPort:any;
  userId:any;
  constructor() { }

}
