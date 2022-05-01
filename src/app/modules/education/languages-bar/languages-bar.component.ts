import { Component, OnInit, Input } from '@angular/core';

import { apiLogoUrl, pdfFileIcon, publishIcon } from '@core/inputs';

import { degreeIcon, locationIcon } from '@core/inputs';
import { presIcon, expandIcon, languageIcon } from '@core/inputs';
import { mapActivitiesPages } from '@core/inputs';

@Component({
  selector: 'app-languages-bar',
  templateUrl: './languages-bar.component.html',
  styleUrls: ['./languages-bar.component.scss']
})
export class LanguagesBarComponent implements OnInit {
  @Input() fragment: any;
  @Input() languagesData: any;


  mapPages: any = mapActivitiesPages;

  apiLogoUrl = apiLogoUrl;
  cardTitle!: string;
  inputDegreesData: any;
  inputLanguagesData: any;

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
    this.inputLanguagesData = this.languagesData;
  }

}
