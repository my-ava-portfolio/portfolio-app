import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { assetsLogoPath } from '@core/global-values/main';

import { faUserGraduate, faMapMarkerAlt, faLanguage, faAddressBook, faExpand } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-trainings-bar',
  templateUrl: './trainings-bar.component.html',
  styleUrls: ['./trainings-bar.component.scss'],
})
export class TrainingsBarComponent implements OnInit, OnChanges {
  @Input() fragment: any;
  @Input() trainingsData: any;

  assetsLogoPath = assetsLogoPath;
  inputTrainingsData: any;

  // icons
  degreeIcon = faUserGraduate;
  locationIcon = faMapMarkerAlt;
  languageIcon = faLanguage;
  presIcon = faAddressBook;
  expandIcon = faExpand;

  availabled_topics = ["trainings"]
  defaultTabView = this.availabled_topics[0];
  tabView!: string;

  constructor() { }

  ngOnInit(): void {
    this.tabView = this.defaultTabView;
    this.inputTrainingsData = this.trainingsData;
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
