import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

import { apiLogoUrl, galleryPages, githubIcon, mapActivitiesPages, notesIcon, projectIcon, projectPages, websiteIcon } from '@core/inputs';

import { ResumeService } from '@services/resume.service';

import { arrowsDownIcon, expandIcon, resumeIcon, galleryIcon, locationIcon, filterIcon, trophyIcon } from '@core/inputs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit, OnChanges {
  @Output() notePathEmit = new EventEmitter<string>();

  @Input() fragment: any;
  @Input() jobsData: any;
  @Input() personalProjectsData: any;
  @Input() volunteersData: any;

  apiImgUrl = apiLogoUrl;
  mapPages: any = mapActivitiesPages;
  galleryPagesRoute: string = galleryPages.route;
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
  publicationsTitle = "Publications";

  // tabView = 'companies';
  availabled_topics = ["job", "personal_project", "volunteer"]
  tabView = this.availabled_topics[0];

  pageLoadingTimeOut: number = 750;

  routeQueryParamsSubscription!: Subscription;
  routeFragmentSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.routeFragmentSubscription = this.activatedRoute.fragment.subscribe((fragment) => {
      // from the activities map & gallery. we wait the page loading
      setTimeout(() => {

        if (fragment !== null) {
          this.tabView = this.findActitivityTypeFromId(fragment)

          // scrolling to the anchor (fragment)
          setTimeout(() => {
            const targetElement: any = document.getElementById(fragment);
            if (targetElement) {
              targetElement.scrollIntoView();
            }
          },this.pageLoadingTimeOut / 2)
        }

      }, this.pageLoadingTimeOut
      )

    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.routeQueryParamsSubscription.unsubscribe();
    this.routeFragmentSubscription.unsubscribe()
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
    // run only if a change occured on the page (like the time slider...)
    this.switchOnTheFirstActivityTypeContainingActivities()
  }

  private switchOnTheFirstActivityTypeContainingActivities(): void {
      // to switch on an activity containing at least 1 activity
      let activitiesCount: any = this.countActivities()
      var currentActivities: string[] = [];
      Object.keys(activitiesCount).filter((item: string) => {
        if (activitiesCount[item]) {
          activitiesCount[item] !== 0
          currentActivities.push(item);
        }
      })
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

  private findActitivityTypeFromId(activityId: string): string {
    let activityType: string = '';

    [this.jobsData, this.personalProjectsData, this.volunteersData].forEach((activities: any) => {
      if (activities !== undefined) {
        for (let item of activities) {
          if (item.identifier === activityId) {
            activityType = item.type;
            break
          }
        }
      }
    })

    return activityType

  }

  trackByMethod(index:number, el:any): number {
    return el.identifier;
  }

  buildColorStyle(color: string) {
   return {'background': 'linear-gradient(to left, ' + color +', white)'}

  }

}


