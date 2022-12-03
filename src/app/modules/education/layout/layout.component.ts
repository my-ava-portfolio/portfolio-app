import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation  } from '@angular/core';

import { ResumeService } from '@services/resume.service';
import { ControlerService } from '@services/controler.service';

import { interval, Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fadeInOutAnimation } from '@core/animation_routes';
import { assetsLogoPath } from '@core/global-values/main';
import { educationPages } from '@core/global-values/topics';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation],
})
export class LayoutComponent implements OnInit {
  fragment!: string | null;
  apiImgUrl = assetsLogoPath;

  activityType = "education"

  activityIdFromActivityComponents!: string;

  // resume left sidebar
  profilData: any;
  degreesData: any;
  languagesData: any;
  trainingsData: any;
  publicationsData: any = []

  // resume center bar
  generalData: any;

  isDataAvailable = false;

  educationTopics = educationPages;

  isAnchorExistsChecker = interval(1000); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);


   }

  ngOnInit(): void {
    this.sendResumeSubMenus()
  }

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment === undefined) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
        }

        if (this.fragment !== null) {
          this.checkAndScrollToAnchorIfNeeded();
        }
      }
    );
  }

  ngOnDestroy(): void {
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.educationTopics.sub_menus)
  }

  checkAndScrollToAnchorIfNeeded(): void {

    this.isAnchorExistsCheckerSubscription = this.isAnchorExistsChecker.pipe(startWith(0)).subscribe(() => {
      try {
        if (this.fragment !== null) {
          const element: any = window.document.getElementById(this.fragment);
          element.scrollIntoView();
        } else {
        }
        this.isAnchorExistsCheckerSubscription.unsubscribe();
      } catch (e) {
      }
    });
  }

}
