import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { apiLogoUrl } from '@shared/inputs';

import { degreeIcon, languageIcon, locationIcon } from '@shared/inputs';
import { presIcon, expandIcon } from '@shared/inputs';
import { state, trigger, transition, animate, style } from '@angular/animations'


@Component({
  selector: 'app-trainings-bar',
  templateUrl: './trainings-bar.component.html',
  styleUrls: ['./trainings-bar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 0})),
      transition(':enter', [
        style({opacity: '0'}),
        animate('700ms ease-in-out', style({opacity: '1'}))
      ]),
    ]),
    trigger('expandCollapse', [
      state('open', style({height: '100%', opacity: 1})),
      state('closed', style({height: 0, opacity: 0})),
      transition('* => *', [animate('1000ms')])
  ]),
  ]
})
export class TrainingsBarComponent implements OnInit, OnChanges {
  @Input() fragment: any;
  @Input() trainingsData: any;

  apiLogoUrl = apiLogoUrl;
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
