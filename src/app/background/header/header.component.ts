import { Component, OnInit } from '@angular/core';

import { navBarTitle, homePage, pages } from '../../core/inputs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  homePage: any = homePage;
  navBarTitle: string = navBarTitle;
  portfolioPages: any = pages;

  constructor() { }

  ngOnInit(): void {
  }

}
