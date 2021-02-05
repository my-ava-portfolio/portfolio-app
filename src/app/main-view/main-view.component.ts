import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { navBarTitle, homePage, pages } from '../core/inputs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent implements OnInit {

  homePage: any = homePage;
  navBarTitle: string = navBarTitle;
  portfolioPages: any = pages;

  constructor() {
  }

  ngOnInit(): void {
  }
  
}
