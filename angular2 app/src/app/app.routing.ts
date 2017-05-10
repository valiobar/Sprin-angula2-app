/**
 * Created by UserX on 4/29/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReggataCreateComponent } from './components/reggata-create/reggata-create.component';
import { RegisterComponent } from './components/register/register.component';
import {AgmCoreModule} from "angular2-google-maps/core";
import {MapComponent} from "./components/map/map.component";
import {PortsComponent} from "./components/ports/ports.component";
import {AuthGuard} from "./utils/auth-guard";
import {ReggataAllComponent} from "./components/reggata-all/reggata-all.component";
import {ReggataDetailsComponent} from "./components/reggata-details/reggata-details.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'reggata/create',canActivate: [AuthGuard], component: ReggataCreateComponent },

  { path: 'reggata/all', component: ReggataAllComponent },
  { path: 'show-reggata/:id',canActivate: [AuthGuard], component: ReggataDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ports/create',canActivate: [AuthGuard] ,component: PortsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
