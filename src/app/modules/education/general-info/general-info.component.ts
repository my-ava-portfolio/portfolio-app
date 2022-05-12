import { Component, OnInit, Input } from '@angular/core';

import { apiLogoUrl, pdfFileIcon, publishIcon } from '@core/inputs';

import { degreeIcon, locationIcon } from '@core/inputs';
import { presIcon, expandIcon, languageIcon } from '@core/inputs';
import { mapActivitiesPages } from '@core/inputs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  @Input() fragment: any;
  @Input() languagesData: any;
  @Input() profilData: any;

  mapPages: any = mapActivitiesPages;

  apiLogoUrl = apiLogoUrl;
  cardTitle!: string;
  inputDegreesData: any;
  inputLanguagesData: any;
  inputProfilData: any;
  // icons
  languageIcon = languageIcon;


  constructor() { }

  ngOnInit(): void {
    this.inputLanguagesData = this.languagesData;
    this.inputProfilData = this.profilData
  }

}
