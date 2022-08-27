import { Component, OnInit, OnDestroy, AfterViewInit, HostListener  } from '@angular/core';

import { ResumeService } from '@services/resume.service';
import { ControlerService } from '@services/controler.service';

import { assetsLogoPath, minWidthLandscape, tagsIcon } from '@core/inputs';
import { experiencesPages } from '@core/inputs';

import { interval, Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { navIcon } from '@core/inputs';
import { fadeInOutAnimation } from '@core/animation_routes';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit  {

  navIcon = navIcon;

  fragment: string = '';

  apiImgUrl = assetsLogoPath;
  activityIdFromActivityComponents!: string;
  isLegendDisplayed = true;

  tagsIcon = tagsIcon;

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

  experiencesTopics: any[] = experiencesPages;


  isAnchorExistsChecker = interval(1000); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  generalDataSubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;
 // resumeDataSubscription
  routeSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.profilData = data
        this.generalData = data.resume_validity_range;
        this.isDataAvailable = true;

      }
    );

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {

        this.jobsData = data.activities_data.jobs;
        this.personalProjectsData = data.activities_data.personal_projects;
        this.volunteersData = data.activities_data.volunteers;
        this.skillsData = data.skills_data;
        this.isActivitiesDataAvailable = true;

        this.activityTypesMetadata = [
          {
            id: "job",
            title: "Entreprises",
            count: this.jobsData.length
          },
          {
            id: "personal-project",
            title: "Projets personnels",
            count: this.personalProjectsData.length
          },
          {
            id: "volunteer",
            title: "Bénévolat",
            count: this.volunteersData.length
          }
        ]


        this.pushActivitiesAvailable(data.activities_data)
      }
    );

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
    this.resumeService.pullGeneralData();
    this.sendResumeSubMenus()

  }

  ngAfterViewInit(): void {
    this.displayContentRegardingDeviceScreen()

  }

  ngOnDestroy(): void {
    this.generalDataSubscription.unsubscribe();
    this.activitiesFilteredSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.experiencesTopics)
  }

  sendActivityId(activityId: string): void {
    this.activityIdFromActivityComponents = activityId;
  }

  pushActivitiesAvailable(activities: any[]): void {
    this.resumeService.pullActivitiesAvailable(activities);
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  @HostListener('window:orientationchange', ['$event'])
  displayContentRegardingDeviceScreen(): void {
    // if mode portrait and width screen <= 1024...
    if (window.screen.orientation.angle === 0 && window.screen.height <= minWidthLandscape) {
      this.isLegendDisplayed = false;
    }
  }

}
