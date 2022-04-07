import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { apiLogoUrl, pdfFileIcon, publishIcon } from '@core/inputs';

import { degreeIcon, locationIcon } from '@core/inputs';
import { presIcon, expandIcon, languageIcon } from '@core/inputs';
import { mapActivitiesPages } from '@core/inputs';


@Component({
  selector: 'app-degrees-bar',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
})
export class DegreesBarComponent implements OnInit, OnChanges {
  @Input() fragment: any;
  @Input() degreesData: any;
  @Input() languagesData: any;
  @Input() publicationsData: any;


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

  availabled_topics = ["degrees", "languages"]
  defaultTabView = this.availabled_topics[0];
  tabView!: string;

  constructor() { }

  ngOnInit(): void {
    this.tabView = this.defaultTabView;

    this.inputDegreesData = this.degreesData;
    this.inputLanguagesData = this.languagesData;
  }

  changeTab(topic: string): void {
    this.tabView = topic;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.fragment.currentValue !== undefined) {
      let fragmentCurrentValue: string = changes.fragment.currentValue
      if (this.availabled_topics.includes(fragmentCurrentValue)) {
        this.tabView = changes.fragment.currentValue;
      }
    }

  }
}
