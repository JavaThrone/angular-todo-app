import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  @Input()
  completedTasksInCategory: number;

  @Input()
  totalTasksInCategory: number;

  @Input()
  uncompletedTasksInCategory: number;

  @Input()
  showStatistic: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
