import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, RequestOptions, HttpModule, Response} from '@angular/http';
import { AuthConfig } from 'angular2-jwt';
import { JwtHttp, JwtConfigService } from 'angular2-jwt-refresh';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import {RouterModule} from '@angular/router';
import {routes} from './app.routing';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './services/auth.guard';

function getJwtHttp(http: Http, options: RequestOptions) {
  let jwtOptions = {
    endPoint: 'https://srv.oculyze.de/services/auth/o_auth/v1/',
    // optional
    payload: { type: 'refresh' },
    beforeSeconds: 3600, // refresh tokeSn before 10 min
    tokenName: 'refresh_token',
    refreshTokenGetter: (() => localStorage.getItem('refresh_token')),
    tokenSetter: ((res: Response): boolean | Promise<void> => {
      res = res.json();

      if (!res['access_token'] || !res['refresh_token']) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        return false;
      }

      localStorage.setItem('access_token', res['access_token']);
      localStorage.setItem('refresh_token', res['refresh_token']);

      return true;
    })
  };
  let authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('access_token')),
  });

  return new JwtHttp(
    new JwtConfigService(jwtOptions, authConfig),
    http,
    options
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: JwtHttp,
      useFactory: getJwtHttp,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
