import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HotelComponent} from './hotel/hotel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {BasicAuthHtppInterceptorService} from './services/auth.inteceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HotelComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
