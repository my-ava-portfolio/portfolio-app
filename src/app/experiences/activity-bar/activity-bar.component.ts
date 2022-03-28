import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { state, trigger, transition, animate, style } from '@angular/animations'

import { apiLogoUrl } from '@core/inputs';

import { ResumeService } from '@services/resume.service';

import { arrowsDownIcon, expandIcon, resumeIcon, galleryIcon, locationIcon, filterIcon, trophyIcon } from '@core/inputs';


@Component({
  selector: 'app-activity-bar',
  templateUrl: './activity-bar.component.html',
  styleUrls: ['./activity-bar.component.scss'],
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
export class ActivityBarComponent implements OnInit, OnChanges {
  @Output() notePathEmit = new EventEmitter<string>();

  @Input() fragment: any;
  @Input() jobsData: any;
  @Input() personalProjectsData: any;

  apiImgUrl = apiLogoUrl;

  // icons
  locationIcon = locationIcon;
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  filterIcon = filterIcon;
  trophyIcon = trophyIcon;
  expandIcon = expandIcon;
  arrowsDownIcon = arrowsDownIcon;


  activityTitle = "Bénévolat";
  themesTitle = "Thèmes";
  contextTitle = "Contexte";
  missionTitle = "Missions";
  envTitle = "Environnement";
  trainingTitle = "Formations";
  detailsTitle = "Détails";

  tabView = 'companies';
  availabled_topics = ["companies", "personal_projects"]
  defaultTabView = this.availabled_topics[0];

  constructor(
    private resumeService: ResumeService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  emitNotePath(notePath: string): void {
    this.notePathEmit.emit(notePath);
  }

  pushActivityId(activityId: string): void {
    this.resumeService.pullActivityIdToPreselectNodeGraph(activityId);
  }

  countDictObject(inputDict: any): number {
    return Object.keys(inputDict).length
  }

  forceArrayType(input: any): string[] {
    return input
  }

  contractValueAlias(contractValue: string): string {
    if (contractValue == "volunteer") {
      return "Bénévolat";
    }
    return contractValue;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.fragment !== undefined) {
      let fragmentCurrentValue: string = changes.fragment.currentValue
      if (this.availabled_topics.includes(fragmentCurrentValue)) {
        this.tabView = changes.fragment.currentValue;
      }
    }

  }

}
