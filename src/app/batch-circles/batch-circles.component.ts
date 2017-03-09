import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-batch-circles',
  templateUrl: './batch-circles.component.html',
  styleUrls: ['./batch-circles.component.scss']
})
export class BatchCirclesComponent implements OnInit {
  @Input() info: any;

  constructor() { }

  ngOnInit() {
  }

}
