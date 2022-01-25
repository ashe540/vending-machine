import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

/* GUARDS */
import { AuthenticationGuard } from './core/auth/auth.guard';
import { BuyerRoleGuard } from './core/auth/buyer-role.guard';
import { SellerRoleGuard } from './core/auth/seller-role.guard';

import { LoginService } from './core/services/login.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { TokenInterceptor } from './core/interceptors/http.interceptor';

import { AuthService } from './core/auth/auth.service';
import { AccountService } from './core/services/account.service';
import { SocketDataService } from './core/services/socket-data.service';
import { ProductService } from './core/services/product.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';

const services = [
  AccountService,
  AuthService,
  LoginService,
  ProductService,
  SocketDataService,
];

const guards = [AuthenticationGuard, BuyerRoleGuard, SellerRoleGuard];

const connection =
  window.location.hostname.indexOf('localhost') > -1
    ? window.location.hostname.concat(':4000')
    : window.location.host;
const config: SocketIoConfig = { url: connection, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    SocketIoModule.forRoot(config),
    SharedModule,
  ],
  providers: [
    ...services,
    ...guards,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
