import { Component, OnInit, HostListener, ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { ControlerService } from '@services/controler.service';

import { minWidthLandscape } from '@core/styles/screen';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, first, Subscription, take } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('contentSize') contentSize!: ElementRef;

  // Here to set the default status of the bar
  // TODO check the orientation to collapse or not the bar
  sideBarCollapsed: boolean = true;

  navBarIcon = faAlignLeft;

  isNavBarDisplayed!: boolean;

  routerSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.routerSubscription = this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
      ).subscribe(data => {
      if ('title' in data.snapshot.data) {
        this.titleService.setTitle(data.snapshot.data.title)
      }
    });

  }

  ngOnInit(): void {

    // the place to control the navbar
    this.displayContentRegardingDeviceScreen();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
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
