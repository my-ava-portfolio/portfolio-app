import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInOutAnimation } from '@core/animation_routes';

import { homePages } from '@core/inputs';

import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit {

  homeTopics: any[] = homePages;

  isWelcomeCardDisplayed = true;

  generalData!: any;

  legendEnabled: boolean = false;

  constructor(
    private controlerService: ControlerService,
  ) {




   }

  ngOnInit(): void {
    this.sendResumeSubMenus();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.homeTopics)
  }

}

