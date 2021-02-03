import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { apiBaseUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit, OnDestroy {
  youtubeDefaultUrl = 'https://www.youtube.com'
  currentDate = new Date().getFullYear();
  defaultActivity: string | null = null;

  apiBaseUrl = apiBaseUrl;
  jobsData: any;
  projectsData: any;

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizer = sanitizer;

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        this.projectsData = data.personal_projects;

        // this.personalProjectsData = data.personnal_projects
        console.log(this.jobsData);

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
    this.filterGallery(this.defaultActivity);
  }

  ngOnDestroy(): void {
    console.log('lalala')
    this.activitiesFilteredSubscription.unsubscribe();
  }

  filterGallery(activityName: string | null): any {
    this.resumeService.pullActivitiesResumeFromGraph(
      this.currentDate,
      activityName
    );
  }

}
