import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AboutDialogComponent} from '../../dialog/about-dialog/about-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: Date;
  site = '/';
  blog = '/';
  siteName = 'ToDo manager';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'About program',
          message: 'This application was created for testing new tech approaches on real cases'
        },
        width: '400px'
      });
  }

}
