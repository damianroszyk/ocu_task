import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-batch-info',
  templateUrl: './batch-info.component.html',
  styleUrls: ['./batch-info.component.scss']
})
export class BatchInfoComponent implements OnInit {
  @Input() info: any;
  created: Date;

  constructor() { }

  ngOnInit() {
    this.created = new Date(this.info.created_at);
  }

}
