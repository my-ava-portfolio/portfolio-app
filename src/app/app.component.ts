import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { bugIcon, githubBugIssueUrl, loadingIcon, mobileIcon, minWidthLandscape, minHeightLandscape } from './core/inputs';
import { interval, Subscription, timer } from 'rxjs';
import { startWith, map, delay  } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  mobileIcon = mobileIcon;
  loadingIcon = loadingIcon;
  bugIcon = bugIcon;

  // TODO move to map module?
  orientationDisclaimerPages: string[] = [
    '/map',
    '/map/app/activities',
    '/map/app/sandbox',
  ];

  orientationErrorMessage!: string;
  isLandscapeDeviceMode = false;
  currentPage!: string;

  constructor(
    private router: Router,
    private location: Location,
  ) {

    // to get the current page opened and adapt content regarding orientation
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
      this.displayOrientationAlert();
    });

  }

  ngOnInit(): void {
    // to return to the home page on refresh
    // this.router.navigate([''])
  }

  ngOnDestroy(): void {
  }

  displayOrientationAlert(): void {
    this.isLandscapeDeviceMode = false;

    if (window.screen.orientation.angle === 90 && window.screen.width < minWidthLandscape && window.screen.height < minHeightLandscape ) {
      if (this.orientationDisclaimerPages.includes(this.currentPage)) {
        this.isLandscapeDeviceMode = true;
        this.orientationErrorMessage = "Page disponible uniquement en mode portrait"
      }
    }
  }


  // to display an alert message about device orientation
  @HostListener('window:orientationchange', ['$event']) onOrientationChange(event: any): void {
    this.displayOrientationAlert();
  }

}


