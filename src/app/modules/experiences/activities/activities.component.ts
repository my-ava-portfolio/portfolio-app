import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { galleryPages, mapActivitiesPages, projectPages, activitiesMapping } from '@core/inputs';

import { ResumeService } from '@services/resume.service';

import { ActivityActionsService } from '../services/activity-actions.service';
import { assetsLogoPath, assetsImagesPath, personalBlogUrl } from '@core/global-values/main';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faImages, faFilter, faTrophy, faAngleDoubleDown, faPaintBrush, faFileAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit, OnChanges, OnDestroy {

  @Input() fragment: any;
  @Input() jobsData: any;
  @Input() personalProjectsData: any;
  @Input() volunteersData: any;

  apiImgUrl = assetsLogoPath;
  assetsImagesPath = assetsImagesPath;
  mapPages: any = mapActivitiesPages;
  galleryPagesRoute: string = galleryPages.route;
  blogPagesRoute: string = projectPages[0].route;
  blogUrl = personalBlogUrl;

  // icons
  locationIcon = faMapMarkerAlt;
  galleryIcon = faImages;
  filterIcon = faFilter;
  trophyIcon = faTrophy;
  arrowsDownIcon = faAngleDoubleDown;
  projectIcon = faPaintBrush;
  githubIcon = faGithub;
  notesIcon = faFileAlt;
  websiteIcon = faGlobe;

  hiddenActivitiesDetails: number[] = [];

  themesTitle = "Thèmes";
  contextTitle = "Contexte";
  missionTitle = "Missions";
  describeTitle = "Description";
  envTitle = "Stack technique";
  trainingTitle = "Formations";
  detailsTitle = "Détails";
  publicationsTitle = "Publications";

  activitiesMapping = activitiesMapping;
  availabled_topics = Object.keys(activitiesMapping)
  tabView = this.availabled_topics[0];

  pageLoadingTimeOut: number = 750;

  routeQueryParamsSubscription!: Subscription;
  activityEnablingSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activityActionsService: ActivityActionsService

  ) {

    this.activityEnablingSubscription = this.activityActionsService.activityId.subscribe(
      (activityId) => {
        this.tabView = activityId
        // reset to avoid conflict between activity category
        this.hiddenActivitiesDetails = [];
      }
    )

  }

  ngOnInit(): void {
    // in order to filter the page regarding an activity
    if ( this.fragment !== '' ) {
      this.pushActivityId(this.fragment);
    }
  }

  ngOnDestroy(): void {
    this.activityEnablingSubscription.unsubscribe()
  }



  addToHiddenDetailsConter(activityIndex: number) {
    if (this.hiddenActivitiesDetails.includes(activityIndex)) {

      const index = this.hiddenActivitiesDetails.indexOf(activityIndex, 0);
      if (index > -1) {
        this.hiddenActivitiesDetails.splice(index, 1);
      }

    } else {
      this.hiddenActivitiesDetails.push(activityIndex);
    }
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
        // switch to the expected activityId
        this.activityActionsService.setActivity(currentActivities[0])
      }
  }

  private countActivities(): any {
    return {
      'job': this.jobsData?.length,
      'personal-project': this.personalProjectsData?.length,
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
   return {'background': 'linear-gradient(to right, ' + color +', white)'}

  }

  keepOrder(): any {
    // check https://stackoverflow.com/a/72286062/13168168
  }

  originalOrder(a: any, b: any): any {
    return 0;
  }

  valueAscOrder(a: any, b: any): any {
    return a.value.localeCompare(b.value);
  }

  keyDescOrder(a: any, b: any): any {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

}


