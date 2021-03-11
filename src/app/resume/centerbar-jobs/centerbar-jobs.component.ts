import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { resumeIcon, galleryIcon, locationIcon, filterIcon } from '../../core/inputs';


@Component({
  selector: 'app-centerbar-jobs',
  templateUrl: './centerbar-jobs.component.html',
  styleUrls: ['./centerbar-jobs.component.scss']
})
export class CenterbarJobsComponent implements OnInit, OnDestroy {
  @Output() notePathEmit = new EventEmitter<string>();
  @Input() jobsData: any;

  fragment!: string | null;

  apiImgUrl = apiLogoUrl;

  // icons
  locationIcon = locationIcon;
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  filterIcon = filterIcon;

  constructor(
    private resumeService: ResumeService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  emitNotePath(notePath: string): void {
    this.notePathEmit.emit(notePath);
  }

  pushActivityId(activityId: string): void {
    this.resumeService.pullActivityIdToPreselectNodeGraph(activityId);
  }

}
