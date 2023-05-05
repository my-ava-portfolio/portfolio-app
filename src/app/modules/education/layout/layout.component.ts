import { Component, OnInit } from '@angular/core';

import { fadeInOutAnimation } from '@core/animation_routes';
import { assetsLogoPath } from '@core/globals/resume-shared-data';

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

  constructor( ) { }

  ngOnInit(): void { }

}
