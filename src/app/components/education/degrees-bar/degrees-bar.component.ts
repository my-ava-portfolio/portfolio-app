import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { apiLogoUrl } from '@shared/inputs';

import { degreeIcon, locationIcon } from '@shared/inputs';
import { presIcon, expandIcon, languageIcon } from '@shared/inputs';
import { state, trigger, transition, animate, style } from '@angular/animations'


@Component({
  selector: 'app-degrees-bar',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
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
export class DegreesBarComponent implements OnInit, OnChanges {
  @Input() fragment: any;
  @Input() degreesData: any;
  @Input() languagesData: any;

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
