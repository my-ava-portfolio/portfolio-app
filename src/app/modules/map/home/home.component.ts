import { Component, OnInit } from '@angular/core';

import { mapActivitiesPages } from '@core/inputs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mapPagesMenus: any[] = mapActivitiesPages.sub_menus;

  constructor() { }

  ngOnInit(): void {
  }

}
