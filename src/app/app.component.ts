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

  mapBlurred: boolean = false;
  mapInteractionEnabled: boolean = false;
  mapInteractionPages: string[] = ['/home', '/map']

  mobileIcon = mobileIcon;
  loadingIcon = loadingIcon;
  bugIcon = bugIcon;

  orientationDisclaimerPages: string[] = ['/map', '/gallery']
  orientationErrorMessage!: string;
  isLandscapeDeviceMode = false;
  currentPage!: string;

  countDown = 60;
  countDownStreamSubscription!: Subscription;

  apiStatus!: string;
  apiOff!: boolean;
  apiStatusMessage = 'Le serveur Heroku va démarrer dans ';
  apiStatusSubMessage = 'Un problème ?';
  apiStatusIssueLink = githubBugIssueUrl;

  constructor(
    private router: Router,
    private location: Location,
  ) {

    this.router.events.subscribe(_ => {
      // TODO find /map route string value from app.ts ?
      if ( this.mapInteractionPages.includes(this.location.path()) || this.location.path().includes('/map') ) {
        this.mapBlurred = false;
        this.mapInteractionEnabled = true;
      } else {
        this.mapBlurred = true;
        this.mapInteractionEnabled = false;
      }
      console.log(this.location.path(), this.mapInteractionEnabled)
    });

    // to get the current page opened and adapt content regarding orientation
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
      this.displayOrientationAlert();
    });

  }

  ngOnInit(): void {
    // to return to the home page on refresh
    this.router.navigate([''])
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


