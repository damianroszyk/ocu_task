import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Response, Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  getContentHeaders() {
    let contentHeaders = new Headers();
    let token = localStorage.getItem('access_token');
    if (token) {
      let encrypted = btoa(`Bearer:${token}`);
      contentHeaders.append('Authorization', `Basic ${encrypted}`);
    }
    return contentHeaders;
  }

  getBatches() {
    let contentHeaders = this.getContentHeaders();

    return this.http.get(environment.apiUrl + '/handler/v1/batches', {headers: contentHeaders})
        .map((response: Response) => {
          return response.json();
        });
  }

  getBatch(id) {
    let contentHeaders = this.getContentHeaders();

    return this.http.get(environment.apiUrl + '/handler/v1/batches/' + id, {headers: contentHeaders})
        .map((response: Response) => {
          return response.json();
        });
  }

  getUser() {
    let contentHeaders = this.getContentHeaders();

    return this.http.get(environment.apiUrl + '/auth/o_auth/v1/user', {headers: contentHeaders})
        .map((response: Response) => {
          return response.json();
        });
  }
}
