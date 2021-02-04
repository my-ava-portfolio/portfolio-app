import { Component, OnInit, OnDestroy } from '@angular/core';

import { apiImgUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { resumeIcon, galleryIcon, locationIcon, arrowUpIcon } from '../../core/inputs';


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


  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.fragment.subscribe(
      (fragment: string) => {
        this.fragment = fragment
      }
    )

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        // this.personalProjectsData = data.personnal_projects
        console.log(this.jobsData);
        this.scrollToAnchorIfRequired()
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

  scrollToAnchorIfRequired(): void {
    try {
      if (this.fragment !== null) {
        console.log(this.fragment)
        const element: any = window.document.getElementById(this.fragment)
        element.scrollIntoView();
        console.log('badaboum', this.fragment)
      }
    } catch (e) {
      console.log(e, 'error');
    }
  }

}
