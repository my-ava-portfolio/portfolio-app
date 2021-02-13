import { Component, OnInit, HostListener  } from '@angular/core';

import { arrowUpIcon } from '../core/inputs';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {

  scrolltoTopActivated!: boolean;
  arrowUpIcon = arrowUpIcon;

  constructor() {
  }

  ngOnInit(): void {
    this.scrolltoTopActivated = false;
  }

  @HostListener('window:scroll',[])
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
}
