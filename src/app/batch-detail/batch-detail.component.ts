import {Component, OnInit, OnDestroy} from '@angular/core';
import {HomeService} from '../services/home.service';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit, OnDestroy {
  data$: any;
  batch: any;
  chartOptions: any;

  constructor(private home: HomeService, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.data$ = this.home.getBatch(id).subscribe(
        data => {
            this.batch = data;
            this.chartOptions = {
                chartType: 'LineChart',
                dataTable: [
                    ['x', 'y']
                ],
                options: {title: 'areaAlive', legend: {position: 'none'}},
            };
            data.result_stat.areaAlive.hist[0].forEach((item, key) => {
                this.chartOptions.dataTable.push([key, item]);
            });
        },
        err => {
          if (err.status === 401) {
            this.auth.logout();
          }
        }
    );
  }

  goHome() {
      this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.data$.unsubscribe();
  }

}
