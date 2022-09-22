import { Component, OnInit, Input } from '@angular/core';
import { assetsLogoPath } from '@core/global-values/main';
import { mapActivitiesPages } from '@core/global-values/topics';

import { faUserGraduate, faLanguage, faAddressBook, faExpand, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-degrees-bar',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
})
export class DegreesBarComponent implements OnInit {
  @Input() fragment: any;
  @Input() degreesData: any;

  isImageValid = true;

  mapPages: any = mapActivitiesPages;

  assetsLogoPath = assetsLogoPath;
  cardTitle!: string;
  inputDegreesData: any;

  // icons
  locationIcon = faMapMarkerAlt;
  degreeIcon = faUserGraduate;
  languageIcon = faLanguage;
  presIcon = faAddressBook;
  expandIcon = faExpand;


  constructor() { }

  ngOnInit(): void {

    this.inputDegreesData = this.degreesData;
  }

  getTitle(data: any): string {
    return (new Date(data.start_date)).getFullYear() + ' - ' +
     (new Date(data.end_date)).getFullYear();
  }

}
