import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from '@core/animation_routes';

import { mapActivitiesPages } from '@core/inputs';
import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOutAnimation]
})
export class HomeComponent implements OnInit {
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
