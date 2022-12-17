import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
    this.controlerService.pullSubMenus(this.homeTopics.sub_menus)
  }

}

