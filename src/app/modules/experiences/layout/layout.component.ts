import { Component, OnInit, OnDestroy  } from '@angular/core';

import { ResumeService } from '@services/resume.service';

import { interval, Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { fadeInOutAnimation } from '@core/animation_routes';
import { assetsLogoPath } from '@core/global-values/main';

import { faGlobeEurope, faTags } from '@fortawesome/free-solid-svg-icons';
import { ActivityActionsService } from '../services/activity-actions.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy  {
  dataAvailable = false;

  fragment: string = '';
  tabView!: string;

  apiImgUrl = assetsLogoPath;
  activityIdFromActivityComponents!: string;

  navIcon = faGlobeEurope;
  tagsIcon = faTags;

  // resume center bar
  generalData: any;
  profilData!: any;

  jobsData!: any;
  personalProjectsData!: any;
  volunteersData!: any;

  activityTypesMetadata!: any[];

  skillsData!: any;

  isAnchorExistsChecker = interval(1000); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  routeSubscription!: Subscription;
  activityEnablingSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private activityActionsService: ActivityActionsService
  ) {

    this.routeSubscription = this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment) {
          // in order to filter the experiences page with a specific activity
          this.fragment = fragment
        }
      }
    );

    this.activityEnablingSubscription = this.activityActionsService.activityId.subscribe(
      (activityId: string) => {
        this.tabView = activityId
      }
    )

   }

  ngOnInit(): void {
    // here we define the default activity mode displayed
    this.sendActivityId("job")

    this.resumeService.queryUserInfoFromApi();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.activityEnablingSubscription.unsubscribe();
  }

  sendActivityId(activityId: string): void {
    this.tabView = activityId
  }

  checkDataAvailability(status: boolean): void {
    this.dataAvailable = status;
  }
}
