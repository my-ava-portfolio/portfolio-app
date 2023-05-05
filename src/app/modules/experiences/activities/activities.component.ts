import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ResumeService } from '@services/resume.service';

import { assetsLogoPath, assetsImagesPath, activitiesMapping } from '@core/globals/resume-shared-data';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faImages, faFilter, faTrophy, faAngleDoubleDown, faPaintBrush, faFileAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { mapActivitiesPages, galleryPages } from '@core/globals/topics_skeleton';
import { fadeInOutAnimation } from '@core/animation_routes';
import { locationIcon, galleryIcon, filterIcon, trophyIcon, arrowsDownIcon, projectIcon, githubIcon, blogIcon, webSiteIcon } from '@core/globals/icons';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ActivitiesComponent implements OnInit, OnDestroy {

  @Input() fragment: any;
  @Input() tabView!: string;

  jobsData!: any;
  personalProjectsData!: any;
  volunteersData!: any;

  apiLogoUrl = assetsLogoPath;
  assetsImagesPath = assetsImagesPath;
  mapPages: any = mapActivitiesPages;
  galleryPagesRoute: string = galleryPages.route;

  // icons
  locationIcon = locationIcon;
  galleryIcon = galleryIcon;
  filterIcon = filterIcon;
  trophyIcon = trophyIcon;
  arrowsDownIcon = arrowsDownIcon;
  projectIcon = projectIcon;
  githubIcon = githubIcon;
  notesIcon = blogIcon;
  websiteIcon = webSiteIcon;

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

  professionalActivitiesSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
  ) {

    this.professionalActivitiesSubscription = this.resumeService.profesionalActivitiesDataSubject.subscribe(
      (data: any) => {
        this.jobsData = data["job"]
        this.personalProjectsData = data["personal-project"]
        this.volunteersData = data["volunteer"]
      }
    )

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.professionalActivitiesSubscription.unsubscribe();
  }

  pushActivityId(activityId: string): void {
    this.resumeService.pullActivityIdToPreselectNodeGraph(activityId);
  }

  countDictObject(inputDict: any): number {
    if (inputDict) {
      return Object.keys(inputDict).length;
    }
    return 0;
  }

  forceArrayType(input: any): string[] {
    return input
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


