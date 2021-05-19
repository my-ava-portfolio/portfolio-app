import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiStatusService } from './services/apistatus.service';

import { bugIcon, githubBugIssueUrl, loadingIcon, mobileIcon, minWidthLandscape, minHeightLandscape } from './core/inputs';
import { interval, Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

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

  orientationErrorMessage!: string;
  isLandscapeDeviceMode = false;
  currentPage!: string;

  apiStatus!: string;
  apiOff!: boolean;
  apiStatusMessage = 'Le serveur Heroku va démarrer dans 30 secondes environ !';
  apiStatusSubMessage = 'Un problème ?';
  apiStatusIssueLink = githubBugIssueUrl;
  ApiContinuousChecker = interval(5000); // observable which run all the time
  ApiContinuousCheckerSubscription!: Subscription;

  constructor(
    private ApiCheckService: ApiStatusService,
    private router: Router,
    private location: Location,
  ) {

    this.ApiCheckService.apiHealth.subscribe(data => {
      this.apiStatus = data;

      if (this.apiStatus === 'Ready') {
        this.apiOff = false;
        // check all the time
        // this.ApiContinuousCheckerSubscription.unsubscribe()
      } else {
        this.apiOff = true;
      }
    });

    // to get the current page opened and adapt content regarding orientation
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
      this.displayOrientationAlert();
    });

  }

  ngOnInit(): void {
    this.checkApiStatus();
  }

  ngOnDestroy(): void {
    this.ApiContinuousCheckerSubscription.unsubscribe();
  }

  checkApiStatus(): void {
    this.ApiContinuousCheckerSubscription = this.ApiContinuousChecker.pipe(startWith(0)).subscribe(() => {
        this.ApiCheckService.callApiStatus();
      }
    );
  }

  displayOrientationAlert(): void {
    if (window.screen.orientation.angle === 90 && window.screen.width < minWidthLandscape && window.screen.height < minHeightLandscape ) {
      if (['/map', '/gallery'].includes(this.currentPage)) {
        this.isLandscapeDeviceMode = true;
        this.orientationErrorMessage = "Page disponible uniquement en mode portrait"
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
