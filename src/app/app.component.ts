import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { minWidthLandscape, minHeightLandscape } from '@core/styles/screen';
import { faMobileAlt, faSpinner, faBug, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mobileIcon = faMobileAlt;
  loadingIcon = faSpinner;
  bugIcon = faBug;
  arrowUpIcon = faArrowAltCircleUp;

  scrolltoTopDisabledForced: boolean = false;
  scrolltoTopActivated: boolean = false

  orientationPortraitRoutes: string[] = [
    '/maps/app/activities',
    '/maps/app/gtfs-viewer',
    '/maps/app/sandbox',
  ];

  routesWhereScrollingIsDisabled: string[] = [
    "/maps/app/activities",
    "/maps/app/sandbox",
    "/maps/app/gtfs-viewer"
  ];


  orientationErrorMessage!: string;
  isLandscapeDeviceMode!: boolean;
  currentPage!: string;

  cookieMessage = "Ce site web ne stocke aucune donnée et ne surveille pas votre activité."
  cookieDismiss = "Fermer"
  cookieLinkText = ""
  pageUrl = "/dataprivacy"

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

    let cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#000000ad"
        },
        button: {
          background: "#ffc107",
          text: "black"
        }
      },
      theme: "black",
      content: {
        message: this.cookieMessage,
        dismiss: this.cookieDismiss,
        link: this.cookieLinkText,
        href: this.pageUrl
      }
    });

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


