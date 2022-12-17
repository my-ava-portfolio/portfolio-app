import { Component, OnInit, OnDestroy  } from '@angular/core';

import { ResumeService } from '@services/resume.service';
import { ControlerService } from '@services/controler.service';

import { interval, Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { fadeInOutAnimation } from '@core/animation_routes';
import { activitiesMapping, assetsLogoPath } from '@core/global-values/main';
import { minWidthLandscape } from '@core/styles/screen';

import { faGlobeEurope, faTags } from '@fortawesome/free-solid-svg-icons';
import { experiencesPages } from '@core/global-values/topics';
import { ActivityActionsService } from '../services/activity-actions.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy  {

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
  isActivitiesDataAvailable = false;

  isDataAvailable = false;

  experiencesTopics = experiencesPages;


  isAnchorExistsChecker = interval(1000); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  routeSubscription!: Subscription;
  activityEnablingSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private activityActionsService: ActivityActionsService
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

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
    this.sendResumeSubMenus()
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.activityEnablingSubscription.unsubscribe();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.experiencesTopics.sub_menus)
  }

  sendActivityId(activityId: string): void {
    this.activityActionsService.setActivity(activityId)
  }

}
