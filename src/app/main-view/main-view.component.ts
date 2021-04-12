import { Component, OnInit, HostListener  } from '@angular/core';

import { arrowUpIcon } from '../core/inputs';

import { fadeAnimation } from '../core/animation_routes';

import { ResumeService } from '../services/resume.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, transition } from '@angular/animations';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('* => *', fadeAnimation),
    ])
  ]
})
export class MainViewComponent implements OnInit {
  enabledStateChange = true;
  scrolltoTopActivated!: boolean;
  arrowUpIcon = arrowUpIcon;
  isNavBarDisplayed!: boolean;

  constructor(
    private router: Router,
    private location: Location,
    private resumeService: ResumeService,
  ) {

    // to hide navbar if home page is opened
    this.router.events.subscribe(_ => {
      if (this.location.path() === '/home') {
        this.isNavBarDisplayed = false;
      } else {
        this.isNavBarDisplayed = true;
      }
    });

    this.resumeService.scrollToTop.subscribe(_ => {
      this.scrollToTop()
    })

  }

  ngOnInit(): void {
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
    return outlet.activatedRouteData.page || {};
  }

}
