import { Component, OnInit, OnDestroy } from '@angular/core';

import { apiImgUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { interval, Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';

import { resumeIcon, galleryIcon, locationIcon, arrowUpIcon } from '../../core/inputs';
import { delay } from "rxjs/operators";


@Component({
  selector: 'app-centerbar-jobs',
  templateUrl: './centerbar-jobs.component.html',
  styleUrls: ['./centerbar-jobs.component.css']
})
export class CenterbarJobsComponent implements OnInit, OnDestroy {
  fragment!: string | null;

  jobsData!: any;

  apiImgUrl = apiImgUrl;

  // icons
  locationIcon = locationIcon;
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  arrowUpIcon = arrowUpIcon;

  isAnchorExistsChecker = interval(500); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        console.log('ralala', fragment)

        if (fragment !== undefined) {
          console.log('ralala', fragment)
          this.fragment = fragment;
          this.checkAndScrollToAnchorIfNeeded()

        }
      }
    )

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        console.log(this.jobsData);
      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('lalala jobs')
    this.activitiesFilteredSubscription.unsubscribe();
  }

  checkAndScrollToAnchorIfNeeded(): void {

    this.isAnchorExistsCheckerSubscription = this.isAnchorExistsChecker.pipe(startWith(0)).subscribe(() => {
      try {
        console.log(this.fragment)
        if (this.fragment !== null) {
          const element: any = window.document.getElementById(this.fragment)
          element.scrollIntoView();
          console.log('bravo')
        } else {
          console.log('no anchor defined');
        }
        this.isAnchorExistsCheckerSubscription.unsubscribe()
      } catch (e) {
        console.log('anchor not found yet');
      }
    })
  }

}
