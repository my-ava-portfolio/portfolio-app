import { Component, OnInit, HostListener  } from '@angular/core';

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

}
