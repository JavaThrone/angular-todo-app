import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic-cart',
  templateUrl: './statistic-cart.component.html',
  styleUrls: ['./statistic-cart.component.css']
})
export class StatisticCartComponent implements OnInit {

  @Input()
  completed: boolean;
  @Input()
  iconName: string;
  @Input()
  count1: number | string;
  @Input()
  countTotal: number | string;
  @Input()
  title: string;

  constructor() {
    this.completed = false;
  }

  ngOnInit(): void {
  }

}
