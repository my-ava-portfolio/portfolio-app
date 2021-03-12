import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { resumeIcon, galleryIcon, locationIcon } from '../../core/inputs';


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

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService
  ) {

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activitiesFilteredSubscription.unsubscribe();
  }

  emitNotePath(notePath: string): void {
    this.notePathEmit.emit(notePath);
  }

}
