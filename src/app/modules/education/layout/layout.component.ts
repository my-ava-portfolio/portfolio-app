import { Component, OnInit } from '@angular/core';

import { ControlerService } from '@services/controler.service';

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
  ) { }

  ngOnInit(): void {
    this.sendResumeSubMenus()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.educationTopics.sub_menus)
  }

}
