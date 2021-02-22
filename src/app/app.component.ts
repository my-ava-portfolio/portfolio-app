import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { mobileIcon } from './core/inputs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  mobileIcon = mobileIcon;

  isLandscapeDeviceMode = false;
  currentPage!: string;

  constructor(
    private router: Router,
    private location: Location
  ) {

    // to get the current page opened
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
      this.displayOrientationAlert();
    });
  }

  ngOnInit(): void {
  }

  displayOrientationAlert(): void {
    console.log('AAAA',window.screen.orientation.angle === 90,  this.currentPage )
    if (window.screen.orientation.angle === 90) {
      if (this.currentPage === '/map') {
        this.isLandscapeDeviceMode = true;
      }
    } else {
      this.isLandscapeDeviceMode = false;
    }
  }


  // to display an alert message about device orientation
  @HostListener('window:orientationchange', ['$event']) onOrientationChange(event: any): void {
    this.displayOrientationAlert();
  }


}
