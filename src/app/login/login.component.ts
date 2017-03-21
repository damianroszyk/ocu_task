import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService) {}

  login(event, username, password) {
    event.preventDefault();

    this.auth.login(username, password);
  }

}