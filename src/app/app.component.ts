import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { bugIcon, githubBugIssueUrl, loadingIcon, mobileIcon, minWidthLandscape, minHeightLandscape, arrowUpIcon } from './core/inputs';
import { interval, Subscription, timer } from 'rxjs';
import { startWith, map, delay  } from 'rxjs/operators';
import { MainService } from '@services/main.service';

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
  arrowUpIcon = arrowUpIcon;

  scrolltoTopDisabledForced: boolean = false;
  scrolltoTopActivated: boolean = false

  orientationPortraitRoutes: string[] = [
    '/map/app/activities',
    '/map/app/gtfs-viewer',
    '/map/app/sandbox',
  ];

  routesWhereScrollingIsDisabled: string[] = [
    "/map/app/activities",
    "/map/app/sandbox",
    "/map/app/gtfs-viewer"
  ];


  orientationErrorMessage!: string;
  isLandscapeDeviceMode!: boolean;
  currentPage!: string;

  constructor(
    private router: Router,
    private location: Location,
  ) {

    // to get the current page opened and adapt content regarding orientation
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
      this.displayOrientationAlert();
      this.disactivateForcedScrollButton()

    });

  }

  ngOnInit(): void {
    // to return to the home page on refresh
    // this.router.navigate([''])
    this.isLandscapeDeviceMode = false;
  }

  ngOnDestroy(): void {
  }

  displayOrientationAlert(): void {
    this.isLandscapeDeviceMode = false;

    if (window.screen.orientation.angle === 90 && window.screen.width < minWidthLandscape && window.screen.height < minHeightLandscape ) {
      const pageFound = this.orientationPortraitRoutes.filter(element => element <= this.currentPage )
      if (pageFound.includes(this.currentPage)) {
        this.isLandscapeDeviceMode = true;
        this.orientationErrorMessage = "Page disponible uniquement en mode portrait"
      }
    }
  }

  // to display an alert message about device orientation
  @HostListener('window:orientationchange', ['$event']) onOrientationChange(event: any): void {
    this.displayOrientationAlert();
  }

  @HostListener('window:scroll', [])
  checkIfScrollShouldBeEnabled(): void {
    if ( window.scrollY > 100 ) {
      this.scrolltoTopActivated = true;
    } else {
      this.scrolltoTopActivated = false;
    }
  }

  disactivateForcedScrollButton(): void {
    const routeUrlFound = this.routesWhereScrollingIsDisabled.filter(element => element <= this.router.url )
    if ( routeUrlFound.includes(this.router.url) ) {
      this.scrolltoTopDisabledForced = true;
    };
  }

  scrollToTop(): void {
    window.scrollTo(0, 0)
  }

}


