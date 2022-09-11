import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { fadeInOutAnimation } from '@core/animation_routes';

import { homePages } from '@core/inputs';

import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit {

  homeTopics: any[] = homePages;

  isWelcomeCardDisplayed = true;


  legendEnabled: boolean = false;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private controlerService: ControlerService,
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);



   }

  ngOnInit(): void {
    this.sendResumeSubMenus();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.homeTopics)
  }

}

