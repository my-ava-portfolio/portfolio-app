import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { expandIcon, projectIcon, galleryIcon, notesIcon, githubIcon, websiteIcon, filterIcon } from '../../core/inputs';


@Component({
  selector: 'app-centerbar-projects',
  templateUrl: './centerbar-projects.component.html',
  styleUrls: ['./centerbar-projects.component.scss']
})
export class CenterbarProjectsComponent implements OnInit, OnDestroy {
  @Output() notePathEmit = new EventEmitter<string>();
  @Input() personalProjectsData: any;

  apiImgUrl = apiLogoUrl;

  // icons
  projectIcon = projectIcon;
  galleryIcon = galleryIcon;
  githubIcon = githubIcon;
  notesIcon = notesIcon;
  websiteIcon = websiteIcon;
  filterIcon = filterIcon;
  expandIcon = expandIcon;

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
