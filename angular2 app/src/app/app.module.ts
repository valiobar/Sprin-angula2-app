import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReggataComponent } from './components/reggata/reggata.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {AppRoutingModule} from "./app.routing";
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortsComponent } from './components/ports/ports.component';
import { MapManipulatorComponent } from './components/map/map-manipulator.component';
import {Ng2Webstorage} from 'ngx-webstorage';
import {GlobalVariablesService} from './services/global-variables.service';
import { ReggataCreateComponent } from './components/reggata-create/reggata-create.component';
import { DatepickerModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {AuthGuard} from "./utils/auth-guard";
import 'gsap';
import { ReggataAllComponent } from './components/reggata-all/reggata-all.component';
import { ReggataDetailsComponent } from './components/reggata-details/reggata-details.component'
/*import { AuthHttp, AuthConfig } from 'angular2-jwt';*/

/** Map relative paths to URLs. */
const map: any = {
  'gsap': 'vendor/gsap/src/minified/' // this tells to system.js loader: Hey when you see: "import 'gsap'" in any of my project files, you should load it form: vendor/gsap blah blah..
};

/** User packages configuration. */
const packages: any = {
  gsap: {
    defaultExtension: 'js',
    main: 'TweenMax.min.js' // the entry point for the gsap package.
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ReggataComponent,
    MapComponent,
    NavbarComponent,
    PortsComponent,
    MapManipulatorComponent,
    ReggataCreateComponent,
    ReggataAllComponent,
    ReggataDetailsComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2Webstorage,
    HttpModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    MaterializeModule.forRoot(),
   AccordionModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqy0ENswKKCC_fPm8Uz6oYhT-7cqKj74c&libraries=places&language=en&region=US'
    })
  ],
  providers: [GoogleMapsAPIWrapper,Ng2Webstorage,GlobalVariablesService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
