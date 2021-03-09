import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { resumeIcon, galleryIcon, locationIcon, filterIcon } from '../../core/inputs';


@Component({
  selector: 'app-centerbar-jobs',
  templateUrl: './centerbar-jobs.component.html',
  styleUrls: ['./centerbar-jobs.component.scss']
})
export class CenterbarJobsComponent implements OnInit, OnDestroy {
  @Output() notePathEmit = new EventEmitter<string>();

  fragment!: string | null;

  jobsData!: any;

  apiImgUrl = apiLogoUrl;

  // icons
  locationIcon = locationIcon;
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  filterIcon = filterIcon;

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService
  ) {

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
    console.log('lalala jobs');
    this.activitiesFilteredSubscription.unsubscribe();
  }

  emitNotePath(notePath: string): void {
    this.notePathEmit.emit(notePath);
  }

  pushActivityId(activityId: string): void {
    this.resumeService.pullActivityIdToPreselectNodeGraph(activityId);
  }
}
