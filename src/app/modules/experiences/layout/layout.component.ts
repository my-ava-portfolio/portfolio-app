import { Component, OnInit, OnDestroy  } from '@angular/core';

import { ResumeService } from '@services/resume.service';

import { interval, Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { fadeInOutAnimation } from '@core/animation_routes';
import { assetsLogoPath } from '@core/globals/resume-shared-data';

import { faGlobeEurope, faTags } from '@fortawesome/free-solid-svg-icons';


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

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.routeSubscription = this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment) {
          // in order to filter the experiences page with a specific activity
          this.fragment = fragment
        }
      }
    );

   }

  ngOnInit(): void {
    // here we define the default activity mode displayed
    this.setActivityTab("job")

    this.resumeService.queryUserInfoFromApi();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  setActivityTab(activityId: string): void {
    this.tabView = activityId
  }

  checkDataAvailability(status: boolean): void {
    this.dataAvailable = status;
  }
}
