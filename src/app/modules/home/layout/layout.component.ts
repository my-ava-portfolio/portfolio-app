import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from '@core/animation_routes';
import { homePages } from '@core/global-values/topics';


import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit {

  homeTopics = homePages;

  constructor(
    private controlerService: ControlerService,
  ) { }

  ngOnInit(): void {
    this.sendResumeSubMenus();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.homeTopics.sub_menus)
  }

}

