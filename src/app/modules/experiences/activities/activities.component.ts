import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { ResumeService } from '@services/resume.service';

import { assetsLogoPath, assetsImagesPath, activitiesMapping } from '@core/global-values/main';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faImages, faFilter, faTrophy, faAngleDoubleDown, faPaintBrush, faFileAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { mapActivitiesPages, galleryPages } from '@core/global-values/topics';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit, OnChanges, OnDestroy {

  @Input() fragment: any;
  @Input() tabView!: string;

  jobsData!: any;
  personalProjectsData!: any;
  volunteersData!: any;

  apiImgUrl = assetsLogoPath;
  assetsImagesPath = assetsImagesPath;
  mapPages: any = mapActivitiesPages;
  galleryPagesRoute: string = galleryPages.route;

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
  trainingTitle = "Formations";
  detailsTitle = "Détails";
  publicationsTitle = "Publications";

  activitiesMapping = activitiesMapping;
  availabled_topics = Object.keys(activitiesMapping)

  pageLoadingTimeOut: number = 750;

  routeQueryParamsSubscription!: Subscription;
  professionalActivitiesSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
  ) {

    this.professionalActivitiesSubscription = this.resumeService.profesionalActivitiesDataSubject.subscribe(
      (data: any) => {
        this.jobsData = data["job"]
        console.log(data)
          this.personalProjectsData = data["personal-project"]
          this.volunteersData = data["volunteer"]
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
    // this.activityEnablingSubscription.unsubscribe();
    this.professionalActivitiesSubscription.unsubscribe();
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

  ngOnChanges(changes: SimpleChanges) {
    // run only if a change occured on the page (like the time slider...)
    // this.switchOnTheFirstActivityTypeContainingActivities()
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


