import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public router: Router, private auth: AuthService) {}

  login(event, username, password) {
    event.preventDefault();

    this.auth.login(username, password)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }

}
