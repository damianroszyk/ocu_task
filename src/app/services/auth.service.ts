import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Response, Http, Headers} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  basic: string = btoa(`${environment.clientId}:${environment.clientSecret}`);
  authenticated = false;

  constructor(private http: Http, private router: Router) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    if (localStorage.getItem('access_token')) {
      this.authenticated = true;
    }
  }

  login(username, password) {
    let contentHeaders = new Headers();
    let body = `grant_type=password&username=${username}&password=${password}`;
    contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    contentHeaders.append('Authorization', `Basic ${this.basic}`);

    this.http.post(environment.apiUrl + '/auth/o_auth/v1/token', body, {headers: contentHeaders})
      .map((response: Response) => {
        let res = response.json();
        this.saveJwt(res);
        this.authenticated = true;
        return response.json();
      })
      .subscribe(
          () => {
            this.router.navigate(['home']);
          },
          (err) => {
            console.log(err);
          }
      );
  }

  logout() {
    localStorage.clear();
    this.authenticated = false;
    this.router.navigate(['/login']);
  }

  saveJwt(jwt) {
    localStorage.setItem('access_token', jwt.access_token);
    localStorage.setItem('refresh_token', jwt.refresh_token);
    localStorage.setItem('user_id', jwt.user_id);
  }

}
