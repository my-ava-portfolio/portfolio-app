import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

import { arrowUpIcon } from '../core/inputs';

import { ResumeService } from '../services/resume.service';
import { ControlerService } from 'src/app/services/controler.service';

import { navBarIcon } from '../core/inputs';



@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  @ViewChild('contentSize') contentSize!: ElementRef;

  // Here to set the default status of the bar
  // TODO check the orientation to collapse or not the bar
  sideBarCollapsed: boolean = true;

  navBarIcon = navBarIcon;

  scrolltoTopActivated!: boolean;
  arrowUpIcon = arrowUpIcon;
  isNavBarDisplayed!: boolean;


  constructor(
    private resumeService: ResumeService,
    private controlerService: ControlerService,
  ) {

    this.resumeService.scrollToTop.subscribe(_ => {
      this.scrollToTop()
    })

  }

  ngOnInit(): void {
    this.scrolltoTopActivated = false;
    this.getContentSize();

  }

  @HostListener('fullscreen', ['$event']) // TODO verify!!!
  @HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  getContentSize(): void {
    let element = this.contentSize
    if (element !== undefined) {
      let width = this.contentSize.nativeElement.offsetWidth;
      let height = this.contentSize.nativeElement.offsetHeight;
      this.controlerService.pullContentWidth(width)
      console.log('Width:' + width);
      console.log('Height: ' + height);
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
    this.getContentSize();

  }

  getSideBarCollapseStatus(status: boolean) {
    this.sideBarCollapsed = status;
    setTimeout(() => this.getContentSize(),400); // 2500 is millisecond
  }

  navigationBarToRight(event: any): void {
    this.sideBarCollapsed = false;
  }

  navigationBarToLeft(event: any): void {
    this.sideBarCollapsed = true;
  }

  collaspedSideBarIfNeeded(): void {
    console.log(this.sideBarCollapsed)
    this.sideBarCollapsed = !this.sideBarCollapsed;
  }




}
