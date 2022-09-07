import { Component, OnInit, Input } from '@angular/core';

import { assetsLogoPath, pdfFileIcon, publishIcon } from '@core/inputs';

import { degreeIcon, locationIcon } from '@core/inputs';
import { presIcon, expandIcon, languageIcon } from '@core/inputs';
import { mapActivitiesPages } from '@core/inputs';


@Component({
  selector: 'app-degrees-bar',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
})
export class DegreesBarComponent implements OnInit {
  @Input() fragment: any;
  @Input() degreesData: any;

  locationIcon = locationIcon;
  isImageValid = true;

  mapPages: any = mapActivitiesPages;

  assetsLogoPath = assetsLogoPath;
  cardTitle!: string;
  inputDegreesData: any;

  // icons
  degreeIcon = degreeIcon;
  languageIcon = languageIcon;
  presIcon = presIcon;
  expandIcon = expandIcon;


  constructor() { }

  ngOnInit(): void {

    this.inputDegreesData = this.degreesData;
  }

  getTitle(data: any): string {
    return (new Date(data.start_date)).getFullYear() + ' - ' +
     (new Date(data.end_date)).getFullYear();
  }

}
