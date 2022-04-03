import { Component, OnInit } from '@angular/core';

import { mapActivitiesPages } from '@core/inputs';
import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mapPagesMenus: any = mapActivitiesPages;

  constructor() { }

  ngOnInit(): void {
  }

}
