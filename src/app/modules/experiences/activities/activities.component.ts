import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { state, trigger, transition, animate, style } from '@angular/animations'

import { apiLogoUrl, galleryPages, githubIcon, mapActivitiesPages, notesIcon, projectIcon, projectPages, websiteIcon } from '@core/inputs';

import { ResumeService } from '@services/resume.service';

import { arrowsDownIcon, expandIcon, resumeIcon, galleryIcon, locationIcon, filterIcon, trophyIcon } from '@core/inputs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
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
export class ActivitiesComponent implements OnInit, OnChanges {
  @Output() notePathEmit = new EventEmitter<string>();

  @Input() fragment: any;
  @Input() jobsData: any;
  @Input() personalProjectsData: any;
  @Input() volunteersData: any;

  apiImgUrl = apiLogoUrl;
  mapPages: any = mapActivitiesPages;
  galleryPagesRoute: string = galleryPages;
  blogPagesRoute: string = projectPages[0].route;

  // icons
  locationIcon = locationIcon;
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  filterIcon = filterIcon;
  trophyIcon = trophyIcon;
  expandIcon = expandIcon;
  arrowsDownIcon = arrowsDownIcon;
  projectIcon = projectIcon;
  githubIcon = githubIcon;
  notesIcon = notesIcon;
  websiteIcon = websiteIcon;


  activityTitle = "Bénévolat";
  themesTitle = "Thèmes";
  contextTitle = "Contexte";
  missionTitle = "Missions";
  describeTitle = "Description";
  envTitle = "Environnement";
  trainingTitle = "Formations";
  detailsTitle = "Détails";

  // tabView = 'companies';
  availabled_topics = ["job", "personal_project", "volunteer"]
  tabView = this.availabled_topics[0];

  pageLoadingTimeOut: number = 500;

  routeSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.routeSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params.tab) {
        this.tabView = params.tab;
      };
      setTimeout(() => {
        if ( this.fragment ) {
          const targetElement: any = document.getElementById(this.fragment);
          if (targetElement) {
            targetElement.scrollIntoView();
          }
        }},
        this.pageLoadingTimeOut
      )
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
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
      // TODO detect the activity linked to the fragment
      if (this.availabled_topics.includes(fragmentCurrentValue)) {
        this.tabView = changes.fragment.currentValue;
      }
    }
    console.log(this.personalProjectsData)
    this.clickOnTheFirstActivityTypeContainingActivities()
  }

  private clickOnTheFirstActivityTypeContainingActivities(): void {
      // to switch on an activity containing at least 1 activity
      let activitiesCount: any = this.countActivities()
      var currentActivities: string[] = [];
      Object.keys(activitiesCount).filter((item: string) => {
        if (activitiesCount[item]) {
          activitiesCount[item] !== 0
          currentActivities.push(item);
        }
      })
      console.log(currentActivities)
      if (currentActivities.length > 0 && !currentActivities.includes(this.tabView)) {
        this.tabView = currentActivities[0];
      }
  }

  private countActivities(): any {
    return {
      'job': this.jobsData?.length,
      'personal_project': this.personalProjectsData?.length,
      'volunteer': this.volunteersData?.length
    }
  }

  trackByMethod(index:number, el:any): number {
    return el.identifier;
  }

}


