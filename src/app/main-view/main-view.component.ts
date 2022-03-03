import { trainIconUnicode } from './../core/inputs';
import { Component, OnInit, HostListener  } from '@angular/core';

import { arrowUpIcon } from '../core/inputs';

import { fadeAnimation } from '../core/animation_routes';

import { ResumeService } from '../services/resume.service';

import { navBarIcon } from '../core/inputs';

import { trigger, transition } from '@angular/animations';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  animations: [
    trigger('routerAnimations', [
      // transition('* => resume', fadeAnimation),
      // transition('* => map', fadeAnimation),
      // transition('* => gallery', fadeAnimation),
      // transition('* => blog', fadeAnimation),
    ])
  ]
})
export class MainViewComponent implements OnInit {
  // Here to set the default status of the bar
  // TODO check the orientation to collapse or not the bar
  sideBarCollapsed: boolean = true;

  navBarIcon = navBarIcon;

  scrolltoTopActivated!: boolean;
  arrowUpIcon = arrowUpIcon;
  isNavBarDisplayed!: boolean;


  constructor(
    private resumeService: ResumeService,
  ) {

    this.resumeService.scrollToTop.subscribe(_ => {
      this.scrollToTop()
    })

  }

  ngOnInit(): void {
    console.log(this.sideBarCollapsed)

    this.scrolltoTopActivated = false;
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

  prepareRouteTransition(outlet: any): any {
    // here the page attributes from app.module.ts to support animation
    return outlet.activatedRouteData.page || {};
  }

  getSideBarCollapseStatus(status: boolean) {
    this.sideBarCollapsed = status;
  }

}
