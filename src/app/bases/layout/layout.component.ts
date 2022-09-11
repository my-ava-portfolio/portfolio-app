import { Component, OnInit, HostListener, ElementRef, ViewChild  } from '@angular/core';

import { minWidthLandscape } from '@core/inputs';

import { ControlerService } from '@services/controler.service';

import { navBarIcon } from '@core/inputs';


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


  navBarIcon = navBarIcon;

  isNavBarDisplayed!: boolean;

  constructor(
    private controlerService: ControlerService,
  ) {  }

  ngOnInit(): void {
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

}