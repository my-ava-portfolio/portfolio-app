import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from './services/api.service';

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
  ApiContinuousChecker = interval(5000); // observable which run all the time
  ApiContinuousCheckerSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private location: Location,
  ) {

    this.apiService.apiHealth.subscribe(data => {
      this.apiStatus = data;

      // this.apiStatus = 'Ready'
      if (this.apiStatus === 'Ready') {
        this.apiOff = false;
        // to not check all the time
        this.ApiContinuousCheckerSubscription.unsubscribe()
        this.countDownStreamSubscription.unsubscribe();

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
    // to return to the home page on refresh
    this.router.navigate([''])

    this.checkApiStatus();
  }

  ngOnDestroy(): void {
    this.ApiContinuousCheckerSubscription.unsubscribe()
    this.countDownStreamSubscription.unsubscribe();
  }

  checkApiStatus(): void {
    this.startCountdownTimer()

    this.ApiContinuousCheckerSubscription = this.ApiContinuousChecker.pipe(startWith(0)).subscribe(() => {
        this.apiService.callApiStatus();
      }
    );
  }

  startCountdownTimer(): void {
    const interval = 1000;
    const duration = 60;
    const countDownStream = timer(0, interval).pipe(
      map(value => duration - value)
    )
    this.countDownStreamSubscription = countDownStream.subscribe(
      value => {
        this.countDown = value
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


