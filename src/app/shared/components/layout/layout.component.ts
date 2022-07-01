import { Component, OnInit, HostListener, ElementRef, ViewChild  } from '@angular/core';

import { arrowUpIcon, minWidthLandscape } from '@core/inputs';

import { MainService } from '@services/main.service';
import { ControlerService } from 'src/app/services/controler.service';

import { navBarIcon } from '@core/inputs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('contentSize') contentSize!: ElementRef;

  // Here to set the default status of the bar
  // TODO check the orientation to collapse or not the bar
  sideBarCollapsed: boolean = true;
  routesWhereScrollingIsDisabled: string[] = [
    "/map/app/activities",
    "/map/app/sandox",
    "/map/app/gtfs-viewer"
  ];

  navBarIcon = navBarIcon;
  arrowUpIcon = arrowUpIcon;

  isNavBarDisplayed!: boolean;
  scrolltoTopActivated!: boolean;
  scrolltoTopDisabledForced: boolean = false;

  constructor(
    private mainService: MainService,
    private controlerService: ControlerService,
    private router: Router,
  ) {

    this.mainService.scrollToTop.subscribe(_ => {
      this.scrollToTop()
    })

    this.router.events.subscribe(_ => {
      this.disactivateForcedScrollButton()
    });

  }

  ngOnInit(): void {
    this.scrolltoTopActivated = false;
    // the place to control the navbar
    this.displayContentRegardingDeviceScreen();
  }

  @HostListener('window:orientationchange', ['$event'])
  displayContentRegardingDeviceScreen(): void {
    // if mode portrait and width screen <= 1024...
    if (window.screen.orientation.angle === 0 && window.screen.height <= minWidthLandscape) {
      this.sideBarCollapsed = false;

    }
  }

  @HostListener('window:scroll', [])
  checkIfScrollShouldBeEnabled(): void {
    if ( window.scrollY > 100 ) {
      this.scrolltoTopActivated = true;
    } else {
      this.scrolltoTopActivated = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0)
  }

  updatePage(outlet: any): any {
    this.controlerService.pullTitlePage(outlet.activatedRouteData.title)
  }

  getSideBarCollapseStatus(status: boolean) {
    this.sideBarCollapsed = status;
  }

  navigationBarToRight(event: any): void {
    this.sideBarCollapsed = false;
  }

  navigationBarToLeft(event: any): void {
    this.sideBarCollapsed = true;
  }

  collaspedSideBarIfNeeded(): void {
    this.sideBarCollapsed = !this.sideBarCollapsed;
  }

  disactivateForcedScrollButton(): void {
    const routeUrlFound = this.routesWhereScrollingIsDisabled.filter(element => element <= this.router.url )
    if ( routeUrlFound.includes(this.router.url) ) {
      this.scrolltoTopDisabledForced = true;
    };
  }

}
