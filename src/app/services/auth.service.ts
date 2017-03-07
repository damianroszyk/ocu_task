import { Injectable } from '@angular/core';
import {contentHeaders} from '../common/headers';
import {JwtHttp} from 'angular2-jwt-refresh';
import {environment} from '../../environments/environment';
import {Response} from '@angular/http';

@Injectable()
export class AuthService {
  basic: string = btoa(`${environment.clientId}:${environment.clientSecret}`);

  constructor(private jwtHttp: JwtHttp) { }

  login(username, password) {
    let body = JSON.stringify({ grant_type: 'password', username, password });
    contentHeaders.append('Authorization', `Basic ${this.basic}`);

    return this.jwtHttp.post('https://srv.oculyze.de/services/auth/o_auth/v1/token', body, {headers: contentHeaders})
      .map((response: Response) => response);
  }

}
