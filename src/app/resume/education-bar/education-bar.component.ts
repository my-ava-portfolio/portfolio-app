import { Component, OnInit, Input } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { degreeIcon, languageIcon, locationIcon } from '../../core/inputs';
import { presIcon, expandIcon } from '../../core/inputs';
import { state, trigger, transition, animate, style } from '@angular/animations'


@Component({
  selector: 'app-education-bar',
  templateUrl: './education-bar.component.html',
  styleUrls: ['./education-bar.component.scss'],
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
export class EducationBarComponent implements OnInit {
  @Input() degreesData: any;
  @Input() languagesData: any;
  @Input() trainingsData: any;

  apiLogoUrl = apiLogoUrl;

  inputDegreesData: any;
  inputLanguagesData: any;
  inputTrainingsData: any;

  // icons
  degreeIcon = degreeIcon;
  locationIcon = locationIcon;
  languageIcon = languageIcon;
  presIcon = presIcon;
  expandIcon = expandIcon;


  tabView = 'degrees-widget';
  tabView2 = 'languages-widget';

  isWidgetOpen = true;

  constructor() { }

  ngOnInit(): void {
    this.inputDegreesData = this.degreesData;
    this.inputLanguagesData = this.languagesData;
    this.inputTrainingsData = this.trainingsData;
  }
}
