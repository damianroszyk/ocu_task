import {Component, OnInit, OnDestroy} from '@angular/core';
import {HomeService} from '../services/home.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  batches: any;
  data$: any;

  constructor(private home: HomeService, private auth: AuthService) { }

  ngOnInit() {
      this.data$ = this.home.getBatches().subscribe(
          data => this.batches = data,
          err => {
              if (err.status === 401) {
                this.auth.logout();
              }
          }
      );
  }

  ngOnDestroy() {
     this.data$.unsubscribe();
  }
}
