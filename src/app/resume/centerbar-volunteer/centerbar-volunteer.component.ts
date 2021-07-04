import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { resumeIcon, galleryIcon, locationIcon, notesIcon, githubIcon, websiteIcon, filterIcon } from '../../core/inputs';

@Component({
  selector: 'app-centerbar-volunteer',
  templateUrl: './centerbar-volunteer.component.html',
  styleUrls: ['./centerbar-volunteer.component.css']
})
export class CenterbarVolunteerComponent implements OnInit {
  @Output() notePathEmit = new EventEmitter<string>();
  @Input() volunteersData: any;

  apiImgUrl = apiLogoUrl;

  // icons
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  githubIcon = githubIcon;
  notesIcon = notesIcon;
  websiteIcon = websiteIcon;
  filterIcon = filterIcon;
  locationIcon = locationIcon;
  
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
