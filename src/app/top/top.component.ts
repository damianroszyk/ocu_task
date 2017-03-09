import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HomeService} from '../services/home.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['top.component.scss']
})
export class TopComponent implements OnInit, OnDestroy {
  user: any;
  data$: any;

  constructor(private home: HomeService, private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.home.getUser().subscribe(
        data => this.user = data,
        err => {
          if (err.status === 401) {
            this.logout();
          }
        }
    );
  }

  toHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.data$.unsubscribe();
  }

}
