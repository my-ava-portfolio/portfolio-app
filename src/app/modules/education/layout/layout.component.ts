import { Component, OnInit } from '@angular/core';

import { ControlerService } from '@services/controler.service';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fadeInOutAnimation } from '@core/animation_routes';
import { assetsLogoPath } from '@core/global-values/main';
import { educationPages } from '@core/global-values/topics';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation],
})
export class LayoutComponent implements OnInit {
  fragment!: string | null;
  apiImgUrl = assetsLogoPath;

  activityType = "education"

  educationTopics = educationPages;

  constructor(
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);
   }

  ngOnInit(): void {
    this.sendResumeSubMenus()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.educationTopics.sub_menus)
  }

}
