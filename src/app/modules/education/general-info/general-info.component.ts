import { Component, OnInit, Input } from '@angular/core';
import { assetsLogoPath } from '@core/global-values/main';
import { mapActivitiesPages } from '@core/global-values/topics';

import { faLanguage } from '@fortawesome/free-solid-svg-icons';

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

  assetsLogoPath = assetsLogoPath;
  cardTitle!: string;
  inputDegreesData: any;
  inputLanguagesData: any;
  inputProfilData: any;
  // icons
  languageIcon = faLanguage;


  constructor() { }

  ngOnInit(): void {
    this.inputLanguagesData = this.languagesData;
    this.inputProfilData = this.profilData
  }

}
