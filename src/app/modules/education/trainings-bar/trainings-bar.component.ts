import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { assetsLogoPath } from '@core/inputs';

import { degreeIcon, languageIcon, locationIcon } from '@core/inputs';
import { presIcon, expandIcon } from '@core/inputs';


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
  degreeIcon = degreeIcon;
  locationIcon = locationIcon;
  languageIcon = languageIcon;
  presIcon = presIcon;
  expandIcon = expandIcon;

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
