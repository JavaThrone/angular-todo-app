import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  showStatistic: boolean;

  @Output()
  toggleStatistic = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleStatistic() {
    this.toggleStatistic.emit(!this.showStatistic);
  }
}
