import { Component, OnInit, Input } from '@angular/core';

import { assetsLogoPath, pdfFileIcon, publishIcon } from '@core/inputs';

import { degreeIcon, locationIcon } from '@core/inputs';
import { presIcon, expandIcon, languageIcon } from '@core/inputs';
import { mapActivitiesPages } from '@core/inputs';


@Component({
  selector: '[app-degrees-bar]',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
})
export class DegreesBarComponent implements OnInit {
  @Input() fragment: any;
  @Input() degreesData: any;
  @Input() publicationsData: any;


  mapPages: any = mapActivitiesPages;

  assetsLogoPath = assetsLogoPath;
  cardTitle!: string;
  inputDegreesData: any;

  // icons
  degreeIcon = degreeIcon;
  locationIcon = locationIcon;
  languageIcon = languageIcon;
  presIcon = presIcon;
  expandIcon = expandIcon;
  publishIcon = publishIcon;
  pdfFileIcon = pdfFileIcon;

  constructor() { }

  ngOnInit(): void {

    this.inputDegreesData = this.degreesData;
  }

}
