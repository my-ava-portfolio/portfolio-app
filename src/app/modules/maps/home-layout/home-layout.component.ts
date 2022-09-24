import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from '@core/animation_routes';
import { mapActivitiesPages } from '@core/global-values/topics';

import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class HomeLayoutComponent implements OnInit {
  
  mapPagesMenus: any = mapActivitiesPages;

  constructor(
    private controlerService: ControlerService,
  ) { }

  ngOnInit(): void {
    this.sendResumeSubMenus()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }

}
